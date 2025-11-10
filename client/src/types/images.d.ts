declare module '*.png' {
  const value: string
  export default value
}
declare module '*.jpg' {
  const value: string
  export default value
}
declare module '*.jpeg' {
  const value: string
  export default value
}
declare module '*.svg' {
  const content: any
  export default content
}
declare module '*.webp' {
  const value: string
  export default value
}

// Allow importing image paths without explicit typings

// Support path-alias imports like `@assets/generated_images/foo.png`
declare module '@assets/*' {
  const value: string
  export default value
}
