var table = new Array(3)
table[0] =new Array(3)
table[1] =new Array(3)
table[2] =new Array(3)

init = () =>{
  for(let i = 0; i < 3; i++){
    for(let j = 0; j < 3; j++){
      table[i][j] = 0
    }
  }
  console.log(`the game start!`)
  //print()
}

playX = (i,j) =>{
  if(table[i][j]===0){
    table[i][j] = 1
    return true
  }
  return false
}

playO = (i,j) =>{
  if(table[i][j]===0){
    table[i][j] = -1
    return true
  }
  return false
}

isEnd = () =>{

  if(checkWin(1)){
    console.log(`win X`)
    return true
  }
  else if(checkWin(-1)){
    console.log(`win O`)
    return true
  }
  else if(checkDeadEnd()){
    console.log(`dead end`)
    return true
  }
  else{
    return false
  }
}

getWin = () =>{
  if(checkWin(1))
    return 1
  if(checkWin(-1))
    return -1
  return 0
}

checkWin = (player) =>{
  switch(player*3){
    case table[0][0]+table[0][1]+table[0][2] : return player
    case table[1][0]+table[1][1]+table[1][2] : return player
    case table[2][0]+table[2][1]+table[2][2] : return player
    case table[0][0]+table[1][0]+table[2][0] : return player
    case table[0][1]+table[1][1]+table[2][1] : return player
    case table[0][2]+table[1][2]+table[2][2] : return player
    case table[0][0]+table[1][1]+table[2][2] : return player
    case table[0][2]+table[1][1]+table[2][0] : return player
    default : return 0
  }
}

getPositionWin = (player) =>{
  switch(player*3){
    case table[0][0]+table[0][1]+table[0][2] : return {p1:'00',p2:'01',p3:'02'}
    case table[1][0]+table[1][1]+table[1][2] : return {p1:'10',p2:'11',p3:'12'}
    case table[2][0]+table[2][1]+table[2][2] : return {p1:'20',p2:'21',p3:'22'}
    case table[0][0]+table[1][0]+table[2][0] : return {p1:'00',p2:'10',p3:'20'}
    case table[0][1]+table[1][1]+table[2][1] : return {p1:'01',p2:'11',p3:'21'}
    case table[0][2]+table[1][2]+table[2][2] : return {p1:'02',p2:'12',p3:'22'}
    case table[0][0]+table[1][1]+table[2][2] : return {p1:'00',p2:'11',p3:'22'}
    case table[0][2]+table[1][1]+table[2][0] : return {p1:'02',p2:'11',p3:'20'}
    default : return {p1:'00',p2:'00',p3:'00'}
  }
}

checkDeadEnd = () =>{
  if(getWin() === 0)
    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(table[i][j]===0)
          return false
      }
    }
  return true
}

print = () =>{
  console.log(`${pretty(table[0][0])} | ${pretty(table[0][1])} | ${pretty(table[0][2])}`)
  console.log(`${pretty(table[1][0])} | ${pretty(table[1][1])} | ${pretty(table[1][2])}`)
  console.log(`${pretty(table[2][0])} | ${pretty(table[2][1])} | ${pretty(table[2][2])}\n`)
}

pretty = (item) =>{
  switch (item) {
    case  1 : return 'X'
    case -1 : return 'O'
    default: return ' '
  }
}

getTable = () =>{
  return table
}
module.exports = {
  init,
  playX,
  playO,
  print,
  getWin,
  isEnd,
  getTable,
  getPositionWin
}
