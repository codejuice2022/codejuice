class TopViewGame {
  requestID = null

  fps = 60
  fpsInterval = 1000 / this.fps
  then = 0
  maxTime = 3 * 60 * 1000

  map = []
  score = 0

  itemSize = 60
  wallColor = '#413131'
  wallSize = 60

  floor = []
  wall = []
  items = []

  itemList = {
    item2: '풋사과',
    item3: '레몬',
    item4: '포도',
    item5: '복숭아',
    item6: '오렌지',
    item9: '제출'
  }
  purchaseList = []
  pickStatus = ''

  height = 600
  width = this.height * 21 / 9

  canvas = null
  ctx = null

  mapCanvas = null
  mapCtx = null

  timerEl = null

  font = '48px sans-serif'

  isTouched = false
  moveDir = 'b'

  player = {
    x: Math.floor((this.width / 2) - 10),
    y: Math.floor((this.height / 2) - 10),
    width: 60,
    height: 60,
    speed: 5,
    state: 'normal',
  }

  spriteImage = null
  spriteImageInfo = {}

  gameEndCallback = (_score, _playTime) => { }

  constructor(_canvasEl, _mapCanvasEl, _timerEl, _map, _spriteImage, _spriteImageInfo, _endCallback) {
    this.canvas = _canvasEl
    this.ctx = _canvasEl.getContext('2d')

    this.mapCanvas = _mapCanvasEl
    this.mapCtx = _canvasEl.getContext('2d')

    this.timerEl = _timerEl

    this.spriteImage = _spriteImage;
    this.spriteImageInfo = _spriteImageInfo

    this.gameEndCallback = _endCallback

    const canvases = [this.canvas, this.mapCanvas]

    canvases.forEach((_canvas) => {
      _canvas.width = this.width
      _canvas.height = this.height
    })

    this.map = _map

    this.makeMap(this.map)
  }

  makeQuest() {
    let itemKeyList = Object.keys(this.itemList).filter(_key => _key !== 'item9')

    const maxListCount = itemKeyList.length
    const maxItemCount = 3

    this.purchaseList = new Array(Math.max(1, Math.round(Math.random() * maxListCount)))
      .fill({
        name: '',
        type: '',
        pickCount: 0,
        count: 1,
      })
      .map((_itemDefault, index) => {
        const _pickedIndex = Math.floor(Math.random() * itemKeyList.length)

        const _pickedKey = itemKeyList.splice(_pickedIndex, 1);

        return {
          ..._itemDefault,
          name: this.itemList[_pickedKey[0]],
          type: _pickedKey[0],
          count: Math.max(1, Math.round(Math.random() * maxItemCount)),
        }
      })
  }

  makeMap() {

    this.map.forEach((_line, lineIndex) => {

      _line.forEach((tile, tileIndex) => {
        const _xPos = (this.width / 2) + (_line.length / 2 - tileIndex) * (-1 * this.wallSize)
        const _yPos = (this.height / 2) + (this.map.length / 2 - lineIndex) * (-1 * this.wallSize);

        switch (tile) {
          case 0:
            this.floor.push({
              //box for the ground
              x: _xPos,
              y: _yPos,
              width: this.wallSize,
              height: this.wallSize,
              type: 'floor',
              id: `floor-${lineIndex}-${tileIndex}`,
            })
            break;

          case 1:
            this.wall.push({
              //box for the ground
              x: _xPos,
              y: _yPos,
              width: this.wallSize,
              height: this.wallSize,
              type: 'wall',
              id: `wall-${lineIndex}-${tileIndex}`,
            });
            break;

          case 2:
          case 3:
          case 4:
          case 5:
          case 6:
          case 9: //submit

            this.items.push({
              //box for the ground
              x: _xPos,
              y: _yPos,
              width: this.itemSize,
              height: this.itemSize,
              type: `item${tile}`,
              id: `item-${lineIndex}-${tileIndex}`,
            })
            break;

          default:
            break;
        }
      });
    });
  }

  colCheck(shapeA, shapeB, moveDir) {
    // get the vectors to check against
    let vX = shapeA.x + shapeA.width / 2 - (shapeB.x + shapeB.width / 2),
      vY = shapeA.y + shapeA.height / 2 - (shapeB.y + shapeB.height / 2),
      // add the half widths and half heights of the objects
      hWidths = shapeA.width / 2 + shapeB.width / 2,
      hHeights = shapeA.height / 2 + shapeB.height / 2;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
      // figures out on which side we are colliding (top, bottom, left, or right)
      const oX = hWidths - Math.abs(vX),
        oY = hHeights - Math.abs(vY);

      if (oX >= oY && (moveDir === 't' || moveDir === 'b')) {
        if (vY < 0) {
          return 't';
        } else {
          return 'b';
        }
      } else {
        if (vX < 0) {
          return 'l';
        } else {
          return 'r';
        }
      }
    }
  }

  drawMap() {
    let dir = ''
    let velX = 0
    let velY = 0

    const dummyGap = 5
    const playerSizeDummy = {
      ...this.player,
      ...(this.moveDir === 'l') && {
        x: this.player.x - dummyGap,
      },
      ...(this.moveDir === 'r') && {
        x: this.player.x + dummyGap,
      },
      ...(this.moveDir === 'b') && {
        y: this.player.y + dummyGap,
      },
      ...(this.moveDir === 't') && {
        y: this.player.y - dummyGap,
      },
    }

    for (let _structure of [...this.wall, ...this.items]) {
      let colDir = this.colCheck(playerSizeDummy, _structure, this.moveDir)

      if (colDir) {
        dir = colDir
        break
      }
    }

    if (this.isTouched && !dir) {
      switch (this.moveDir) {
        case 'l':
          velX = this.player.speed
          break;
        case 'r':
          velX = -1 * this.player.speed
          break;
        case 't':
          velY = this.player.speed
          break;
        case 'b':
          velY = -1 * this.player.speed
          break;

        default:
          break;
      }
    }

    [...this.wall, ...this.items, ...this.floor].forEach((_structure) => {

      _structure.x = _structure.x + velX
      _structure.y = _structure.y + velY

      this.mapCtx.drawImage(
        this.spriteImage,
        this.spriteImageInfo.size * this.spriteImageInfo.posIndex[_structure.type].x,
        this.spriteImageInfo.size * this.spriteImageInfo.posIndex[_structure.type].y,
        this.spriteImageInfo.size,
        this.spriteImageInfo.size,
        Math.floor(_structure.x),
        Math.floor(_structure.y),
        _structure.width,
        _structure.height,
      );
    });

    this.mapCtx.fill();
  }

  getPlayerActionAreaPos = (_size) => {
    const _playerPos = {
      x: this.player.x,
      y: this.player.y
    }

    switch (this.moveDir) {
      case 'l':
        return {
          ..._playerPos,
          x: _playerPos.x - _size.width
        }
      case 'r':
        return {
          ..._playerPos,
          x: _playerPos.x + _size.width
        }
      case 't':
        return {
          ..._playerPos,
          y: _playerPos.y - _size.height
        }
      case 'b':
        return {
          ..._playerPos,
          y: _playerPos.y + _size.height
        }

      default:
        return _playerPos
    }
  }

  drawPlayer(_playTime) {
    this.ctx.fillStyle = 'red';
    // Character
    // this.ctx.fillRect(Math.floor(this.player.x), Math.floor(this.player.y), this.player.width, this.player.height);

    const getPlayerImageSpritePos = (playerImagePos, _moveDir, _isTouched, _playTime) => {
      if (_isTouched) {
        const _ms = new Date(_playTime).getMilliseconds();

        return playerImagePos[`${_moveDir}Walk`][Math.floor((4 * _ms) / 1000)]
      } else {
        return playerImagePos[_moveDir]
      }
    }

    const playerImagePos = getPlayerImageSpritePos(this.spriteImageInfo.posIndex.player, this.moveDir, this.isTouched, _playTime);

    this.ctx.drawImage(
      this.spriteImage,
      this.spriteImageInfo.size * playerImagePos.x,
      this.spriteImageInfo.size * playerImagePos.y,
      this.spriteImageInfo.size,
      this.spriteImageInfo.size,
      Math.floor(this.player.x),
      Math.floor(this.player.y),
      this.player.width,
      this.player.height,
    );

    // root area
    // this.ctx.strokeStyle = 'blue';
    // const _rootPos = this.getPlayerActionAreaPos(this.player);
    // this.ctx.strokeRect(_rootPos.x, _rootPos.y, this.player.width, this.player.width);

    this.ctx.fill();
  }

  drawItemName(_playTime) {
    this.ctx.save()

    this.items.forEach((_structure) => {
      const _textY = _structure.y + Math.floor(Math.sin(_playTime / 300) * 5)

      this.ctx.globalAlpha = .7

      this.ctx.fillStyle = '#333'
      this.ctx.roundRect(_structure.x + _structure.width / 2 - 20, _textY - 9, 40, 16, 8)
      this.ctx.fill()

      this.ctx.textAlign = 'center'
      this.ctx.textBaseline = 'middle'
      this.ctx.fillStyle = '#fff'
      this.ctx.fillText(this.itemList[_structure.type], _structure.x + _structure.width / 2, _textY)

    });

    this.ctx.restore()
  }

  playGame(startTime = 0) {
    const _playTime = new Date().getTime() - startTime;

    const elapsed = _playTime - this.then;

    if (elapsed >= this.fpsInterval) {

      const endPercentage = Math.max(100 - Math.floor(_playTime / this.maxTime * 10000) / 100, 0)

      this.timerEl.style.width = `${endPercentage}%`

      if (!endPercentage) {
        //game end..
        this.gameEndCallback(this.score)

        return
      }

      this.then = _playTime - (elapsed % this.fpsInterval)


      this.ctx.clearRect(0, 0, this.width, this.height)
      this.mapCtx.clearRect(0, 0, this.width, this.height)

      this.ctx.beginPath()

      this.drawMap()

      this.drawPlayer(_playTime)

      this.drawItemName(_playTime)
    }

    this.requestID = requestAnimationFrame(() => this.playGame(startTime))
  }

  setMoveDir(evt) {
    const touch = evt.touches[0];

    const rect = this.canvas.getBoundingClientRect(),
      scaleX = this.canvas.width / rect.width,
      scaleY = this.canvas.height / rect.height

    const mousePos = {
      x: (touch.clientX - rect.left) * scaleX,
      y: (touch.clientY - rect.top) * scaleY
    }

    const rad = Math.atan2(this.height / 2 - mousePos.y, this.width / 2 - mousePos.x)
    let _r = (rad * 180) / Math.PI
    _r = _r < 0 ? 360 + _r : _r

    if (335 < _r || _r < 25) {
      this.moveDir = 'l'
    } else if (25 < _r && _r < 155) {
      this.moveDir = 't'
    } else if (155 < _r && _r < 205) {
      this.moveDir = 'r'
    } else {
      this.moveDir = 'b'
    }
  }

  pickItem() {
    const _rootPos = this.getPlayerActionAreaPos(this.player);

    let colItem = undefined

    for (let _item of this.items) {
      let colDir = this.colCheck({
        ...this.player,
        ..._rootPos,
      }, _item, this.moveDir)

      if (colDir) {
        colItem = _item
        break
      }
    }

    if (!colItem) {
      return {
        score: this.score,
        status: this.pickStatus,
        purchaseList: this.purchaseList
      }
    }

    if (colItem.type === 'item9') {
      // submit..!

      if (this.pickStatus === 'success') {
        this.score = this.score + 10
        this.makeQuest()
      } else {
        this.purchaseList = this.purchaseList.map((item) => ({
          ...item,
          pickCount: 0,
        }))
          .filter((item) => item.count)
      }

      this.pickStatus = ''

      return {
        score: this.score,
        status: this.pickStatus,
        purchaseList: this.purchaseList
      }
    }

    const hasItem = !!this.purchaseList.filter((item) => item.type === colItem.type).length

    let _purchaseList = [...this.purchaseList]

    if (!hasItem) {
      _purchaseList = [
        ..._purchaseList,
        {
          name: this.itemList[colItem.type],
          type: colItem.type,
          pickCount: 0,
          count: 0,
        }
      ]
    }

    this.purchaseList = _purchaseList.map((item) => {
      if (colItem && colItem.type === item.type) {
        return {
          ...item,
          pickCount: item.pickCount + 1
        }
      }

      return item
    })

    const successes = this.purchaseList.map((item) => {
      if (item.pickCount > item.count) {
        this.pickStatus = 'overload'
        return false
      } else if (item.pickCount === item.count) {
        return true
      } else {
        return false
      }
    })

    this.pickStatus = successes.filter(_s => _s).length === this.purchaseList.length ? 'success' : this.pickStatus

    return {
      score: this.score,
      status: this.pickStatus,
      purchaseList: this.purchaseList
    }
  }

  startGame() {
    this.then = 0;

    this.canvas.addEventListener('touchstart', (e) => {
      this.isTouched = true
      this.setMoveDir(e)
    })
    this.canvas.addEventListener('touchmove', (e) => {
      if (this.isTouched) {
        this.setMoveDir(e)
      }
    })
    this.canvas.addEventListener('touchend', (e) => {
      this.isTouched = false
    })

    this.makeQuest()

    this.playGame(new Date().getTime())

    return this.purchaseList
  }

  cancelPlay() {
    this.requestID && cancelAnimationFrame(this.requestID);
  }
}
