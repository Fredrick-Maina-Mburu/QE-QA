const { v4: uuidv4 } = require('uuid');
const { format } = require('date-fns')
const fsPromise = require('fs').promises
const path = require('path')
const fs = require('fs')

logEvents = async (message) => {
  const logItem = `${uuidv4()} ${format(new Date(), "MM/dd/yyyy")} ${message}`

  try {
    const LogPath = path.join(__dirname, 'Logs')
    
    if (!fs.existsSync(LogPath))
      await fsPromise.writeFile(path.join(__dirname, 'Logs', 'eventLogs.txt'))
  
    await fsPromise.appendFile(path.join(LogPath, 'eventLogs.txt'), logItem)
    console.log(logItem)
    
  } catch (error) {
    console.log(error)
  }
}

module.exports = logEvents