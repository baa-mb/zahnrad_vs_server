input.onButtonPressed(Button.A, function () {
    laufrichtung = 1
    pins.servoWritePin(AnalogPin.P16, 0)
    basic.showLeds(`
        . . . . .
        . . . . .
        # . . . #
        . # . # .
        . . # . .
        `)
})
input.onButtonPressed(Button.AB, function () {
    laufrichtung = 0
    basic.showIcon(IconNames.Diamond)
    pins.servoWritePin(AnalogPin.P16, 90)
})
radio.onReceivedString(function (receivedString) {
    if (receivedString.includes("AB")) {
        control.raiseEvent(
        EventBusSource.MICROBIT_ID_BUTTON_AB,
        EventBusValue.MICROBIT_BUTTON_EVT_CLICK
        )
    } else {
        if (receivedString.includes("A")) {
            control.raiseEvent(
            EventBusSource.MICROBIT_ID_BUTTON_A,
            EventBusValue.MICROBIT_BUTTON_EVT_CLICK
            )
        } else {
            if (receivedString.includes("B")) {
                control.raiseEvent(
                EventBusSource.MICROBIT_ID_BUTTON_B,
                EventBusValue.MICROBIT_BUTTON_EVT_CLICK
                )
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    laufrichtung = -1
    pins.servoWritePin(AnalogPin.P16, 180)
    basic.showLeds(`
        . . # . .
        . # . # .
        # . . . #
        . . . . .
        . . . . .
        `)
})
function lenkung (num: number) {
    winkel = Math.map(num, -1023, 1023, 0, 180)
    pins.servoWritePin(AnalogPin.P1, winkel)
}
let abstand = 0
let winkel = 0
let laufrichtung = 0
basic.showString("DLPL")
basic.showIcon(IconNames.Diamond)
radio.setGroup(54)
laufrichtung = 0
basic.forever(function () {
    abstand = sonar.ping(
    DigitalPin.P2,
    DigitalPin.P1,
    PingUnit.Centimeters
    )
    if (abstand < 5) {
        laufrichtung = 0
        pins.servoWritePin(AnalogPin.P16, 90)
    }
    basic.pause(1000)
})
