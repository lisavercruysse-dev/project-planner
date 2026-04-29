export enum Colors {
  BLUE = "blue",
  YELLOW = "yellow",
  RED = "red",
  ORANGE = "orange",
  PURPLE = "purple",
  PINK = "pink",
  GREEN = "green",
}

export const ColorStyles: Record<Colors, {background: string; text: string}> = {
  [Colors.BLUE]: {
    background: "#E7F0F6",
    text: "#202A55"
  },
  [Colors.YELLOW]: {
    background: "#F6F4E7",
    text: "#9C812C"
  },
  [Colors.RED]: {
    background: "#F6E7E7",
    text: "#552020"
  },
  [Colors.ORANGE]: {
    background: "#F5E5CE",
    text: "#8F5400"
  },
  [Colors.PURPLE]: {
    background: "#F2E7F6",
    text: "#522F61"
  },
  [Colors.PINK]: {
    background: "#F6E7F3",
    text: "#63275B"
  },
  [Colors.GREEN]: {
    background: "#EBF6E7",
    text: "#3B5520"
  }
}