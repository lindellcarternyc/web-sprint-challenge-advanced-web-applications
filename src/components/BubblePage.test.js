import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BubblePage from "./BubblePage";

import * as ax from '../helpers/axiosWithAuth'
jest.mock('../helpers/axiosWithAuth')

const colors = [{
  color: "aliceblue",
  code: {
    hex: "#f0f8ff",
  },
  id: 1,
},
{
  color: "limegreen",
  code: {
    hex: "#99ddbc",
  },
  id: 2,
},
{
  color: "aqua",
  code: {
    hex: "#00ffff",
  },
  id: 3,
}]

ax.axiosWithAuth.mockImplementation(() => {
  return {
    get: async () => {
      return { data: colors }
    }
  }
})

test("Renders BubblePage without errors", () => {
  render(<BubblePage />)
});

test("Fetches data and renders the bubbles on mounting", async () => {
  render(<BubblePage />)

  waitFor(async () => {
    const colorEls = await screen.findAllByTestId('color')
    expect(colorEls).not.toBeNull()
    expect(colorEls).toHaveLength(colors.length)
  })
});

//Task List
//1. Setup test for basic rendering of component
//2. Setup test for initial rendering of bubbles on loading