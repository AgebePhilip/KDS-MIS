export function canAccess(validUsers, user, node){
  if(!validUsers.includes(user)){
    return null
  }
  return node
}