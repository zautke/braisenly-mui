const zDepth = {
  for: (componentName: string) =>
  {
    const shadows = [
      "none",

      // [1]: cards
      "0 1px 0 0 rgba(37, 45, 57, 0.02)",

      // [2]: buttons, thumbnail hover, card hover
      "0 1px 2px 0 rgba(34, 54, 70, 0.1)",

      // [3]: dropdown menu, D/T pickers, tooltips, D&D
      "0 5px 10px 0 rgba(13, 35, 69, 0.15)",

      // [4]: modals
      "0 10px 20px 0 rgba(37, 45, 57, 0.2)",
    ]

    const depthMap: Record<string, any> = {
      card: 1,
      button: 2,
      'card:hover': 2,
      select: 3,
      tooltip: 3,
      modal: 4
    }

    const style: Record<string, any> = { boxShadow: 'none' }

    if (Object.keys(depthMap).includes(componentName))
    {
      style.boxShadow = `${shadows[depthMap[componentName]]}`
    } else
    {
      console.info(`component '${componentName}' does not have an entry in the theme zDepth map: \n `, depthMap)
    }

    return style
  },
}

export default zDepth
