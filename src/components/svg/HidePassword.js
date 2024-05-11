import { Svg, Path } from "react-native-svg"

export default function HidePassword({ fill }) {
    return (
        <Svg
            width={50}
            height={50}
            viewBox="0 -16 544 544"
            fill={fill}
        >
            <Path d="m108 60 360 360-32 32-74-74q-41 22-90 22-64 0-118-39-55-39-90-105 15-27 38-54 22-28 42-42L76 92zm260 196q0-40-28-68t-68-28l-43-43q25-5 43-5 65 0 120 40 54 40 88 104-6 13-19 32t-27 34zm-96 96q27 0 50-14l-29-29q-10 3-21 3-23 0-39-16-17-17-17-40 0-9 4-20l-30-30q-14 23-14 50 0 40 28 68t68 28" />
        </Svg>
    )
}