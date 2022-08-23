import React, { useRef } from 'react'
import { View, Alert } from 'react-native'

import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { CLEAR_GAME, GET_GAME_LOG, SET_CANVAS_OPTION } from '~/consts/web-view-message-type'
import { setGameScore } from '~/core/redux/slices/globalSlice'

import { useDispatch } from 'react-redux'
import gameMap from '~/utils/picking-game/picking-game-map.json'

interface StyleProps {
  canvasWidth: number
}

interface Props {
  moveToNextStep: () => void
}
const PickingGameCanvas = ({ moveToNextStep }: Props) => {
  const dispatch = useDispatch()
  const webviewRef = useRef<WebView>(null)

  const sendGameOption = () => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(
        JSON.stringify({
          type: SET_CANVAS_OPTION,
          data: {
            map: gameMap,
          },
        })
      )
    }
  }

  const handleOnMessage = (event: WebViewMessageEvent) => {
    const onMsgParam = JSON.parse(event.nativeEvent.data)

    switch (onMsgParam.type) {
      case GET_GAME_LOG:
        console.log(onMsgParam.message)
        break
      case CLEAR_GAME:
        dispatch(setGameScore(onMsgParam.message))

        moveToNextStep()

      default:
        break
    }
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#768d8f',
      }}
    >
      <WebView
        ref={webviewRef}
        onMessage={handleOnMessage}
        onLoad={sendGameOption}
        source={{ uri: 'file:///android_asset/game/index.html' }}
        originWhitelist={['*']}
      />
    </View>
  )
}

export default PickingGameCanvas
