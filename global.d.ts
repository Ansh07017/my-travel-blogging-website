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

// Support path-alias imports like `@assets/generated_images/foo.png`
declare module '@assets/*' {
  const value: string
  export default value
}

// Specific alias for generated_images path used throughout the app
declare module '@assets/generated_images/*' {
  const value: string
  export default value
}
