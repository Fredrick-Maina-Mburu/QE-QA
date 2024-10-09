const fs = require('fs')
const path = require('path')

function serializeDirTree(rootDir, depth){
  if (depth < 0)
    return null

  const stats = fs.statSync(rootDir)
  const isDirectory = stats.isDirectory()

  if(isDirectory){
    const children = []
    const items = fs.readdirSync(rootDir)

    for(const item of items){
      const itemPath = path.join(rootDir, item)
      const child = serializeDirTree(itemPath, depth - 1)
      if (child) children.push(child)
    }
    const obj = {
      path: rootDir ,
      name: path.basename(rootDir),
      type: 'dir',
      size: stats.size,
      children: children
    }
    return obj
  } else {
    return{
      path:rootDir,
      name: path.basename(rootDir),
      type: 'file',
      size: stats.size
    }
  }
}



const tree = serializeDirTree('C:/QA-QE/Html',2)
console.log(JSON.stringify(tree, null, 2));