import { Svg, Path } from "react-native-svg"

export default function ShowPassword({ fill }) {
    return (
        <Svg
            width={50}
            height={50}
            viewBox="0 -16 544 544"
            fill={fill}
        >
            <Path d="M272 400q-67 0-121-39-55-39-87-105 32-66 87-105 54-39 121-39 64 0 120 41 56 40 88 103-32 63-88 104-56 40-120 40m0-48q40 0 68-28t28-68-28-68-68-28-68 28-28 68 28 68 68 28m0-40q-23 0-39-16-17-17-17-40t17-39q16-17 39-17t40 17q16 16 16 39t-16 40q-17 16-40 16" />
        </Svg>
    )
}