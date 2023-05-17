import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: 'src'
    }
  ],
  clean: true,
  declaration: true,
  externals: [],
  rollup: {
    emitCJS: true
  }
})
