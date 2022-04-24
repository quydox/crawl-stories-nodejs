exports.getStatus = (status) => {
  return status.toLowerCase() === 'full' ? 'finish' : 'doing'
}

