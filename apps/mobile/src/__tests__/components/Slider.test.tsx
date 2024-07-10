import React from "react"
import { create } from "react-test-renderer"
import { View } from "react-native"
import { Slider } from "../../components/Slider"

describe("Slider Component", () => {
  test("should render the slider with initial value and change value correctly", () => {
    const component = create(<Slider />)

    const slider = component.root.findByType(View)

    expect(slider.props.children.props.value).toBe(5000)

    slider.props.children.props.onValueChange([7000])

    expect(slider.props.children.props.value).toBe(7000)
  })
})
