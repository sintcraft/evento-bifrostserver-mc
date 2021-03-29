const mineflayer = require('mineflayer')
var lvl = require('./niveles')
var info = require('./informacion.json')
var ronda = 0
var contador = 600
const bot = mineflayer.createBot({
    host: 'mc.bifrostserver.tk',
    username: 'Evento',
    version: false
})
var contador_d = setInterval(function(){
    try{
        bot.chat(info.commandos.iniciales[1]+contador)
    contador--
    if(contador==0){
        next()
        clearInterval(contador_d)
    }
    }catch(a){}
},1000)


bot.on('login', () => {
    console.log('Evento dentro entro jaja')
    bot.chat('/login contraseña')
    setTimeout(function(){reset()}, 300)
})
bot.on('chat', async (user, msg) => {
    if (user != 'sintcraft') return
    if(msg =='reset'){
        reset()
    }
    if (msg == 'start') {
        start()
    }
    if (msg == 'next'){
        next()
    }
    if(msg=='infectado'){
        infectado(5)
    }
    if(msg == 'rayos'){
        rayos()
        bot.chat('/effect clear @a')
        setTimeout(function(){bot.chat('/effect give @a minecraft:blindness 10 1')},200)
    }
})



//=================== FASES ===================

async function reset() {
    bot.chat('/tp @a[name=!Evento] 10321 89 -10423')
    bot.chat('/team modify contador-evento suffix {"text":" pronto","color":"gold"}')
    bot.chat('/kill @e[type=!minecraft:player]')
    bot.chat('/clear @a')
    bot.chat('/spawnpoint @a 10321 89 -10423')
    clearInterval(contador_d)
    setTimeout(function(){bot.chat('/scoreboard players reset Siguiente_ronda tiempo')}, 2000)
    setTimeout(function(){
        for(let i = 0;i<info.commandos.reducir_zona.length;i++){
            setTimeout(function(){bot.chat(info.commandos.reducir_zona[i])},i*350)
        }
    }, 4000)
    ronda = 0
}

async function start() {
    let j = 20
    bot.chat('/gamerule doDaylightCycle false')
    bot.chat('/gamerule doWeatherCycle false')
    for (let i = 20; i >= 0; i--) {
        setTimeout(function () {
            bot.chat(`/team modify contador-evento suffix {"text":" en ${j}s","color":"gold"}`)
            if(j<6 && j>0){
                bot.chat(`/title @a title {"text":"Evento en ${j}s","color":"yellow"}`)
                bot.chat(info.sonidos.xp_lvlup)
            }
            if(j>5){
                bot.chat(`/title @a actionbar {"text":"Evento en ${j}s","color":"yellow"}`)
            }
            if (j == 0) {
                bot.chat('/title @a title {"text":"Invacion zombie","color":"yellow"}')
                next()
                setTimeout(function(){bot.chat(info.commandos.iniciales[1]+'600')},300)
                bot.chat('/time set 14000')
                bot.chat(info.efectos.seguerai)
                setTimeout(function(){bot.chat('/effect clear @a')},3000)
                bot.chat(info.sonidos.zombie)
            }
            j--
        }, i * 1000)
    }
}

function revivir() {
    bot.chat('/tp @a[name=!Evento] ' + info.spawns.Punto_Cero)
    bot.chat('/effect give @a[team=muerto-evento] minecraft:blindness 5 3')
    bot.chat('/effect give @a minecraft:instant_health 1 50')
    rayos()
    bot.chat('/effect clear @a')
    setTimeout(function(){bot.chat('/effect give @a[team=muerto-evento] minecraft:blindness 1 1')},200)
    bot.chat('/team join vivo-evento @a[team=muerto-evento]')
}

function rayos(){
    bot.chat('/effect clear @a')
    for(let pilar of info.pilares.todos){
        bot.chat('/summon minecraft:lightning_bolt '+pilar)
    }
}
async function next() {
    contador = 600
    clearInterval(contador_d)
    ronda=ronda+1
    switch (ronda) {
        case 1:
            bot.chat('/clear @a')
            revivir()
            setTimeout(function(){bot.chat(mending(info.items.cuchillo_chikito))}, 1000)
            zombies(10)
            skeleton(1)
            contador_S()
            break
        case 2:
            revivir()
            zombies(10)
            spider(1)
            skeleton(5)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana))
                bot.chat(mending(info.items.arco))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.armaduras.pechoOro))
            }, 1000)
            contador_S()
            break
        case 3:
            revivir()
            zombies(2)
            spider(4)
            skeleton(7)
            infectado(1)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.espada_del_gigante))
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.escudo))
            }, 1000)
            contador_S()
            break
        case 4:
            revivir()
            skeleton(10)
            infectado(6)
            spider(4)
            infectado2(1)
            zombies(3)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana))
                bot.chat(mending(info.items.arco_clint))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.armaduras.fullIron[0]))
                bot.chat(mending(info.items.armaduras.fullIron[1]))
                bot.chat(mending(info.items.armaduras.fullIron[2]))
                bot.chat(mending(info.items.armaduras.fullIron[3]))
            }, 1000)
            contador_S()
            break
        case 5:
            revivir()
            bot.chat(info.bosses.lvl5)
            infectado(13)
            infectado2(5)
            zombies(3)
            spider(8)
            enfermero(1)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.armaduras.fullIron[0]))
                bot.chat(mending(info.items.armaduras.fullIron[1]))
                bot.chat(mending(info.items.armaduras.fullIron[2]))
                bot.chat(mending(info.items.armaduras.fullIron[3]))
            }, 1000)
            contador_S()
            break
        case 6:
            revivir()
            infectado(4)
            infectado2(4)
            spider(10)
            enfermero(1)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana))
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.oscu_plata))
                bot.chat(info.efectos.seguerai)
                bot.chat(mending(info.items.armaduras.fullIron[0]))
                bot.chat(mending(info.items.armaduras.fullIron[1]))
                bot.chat(mending(info.items.armaduras.fullIron[2]))
                bot.chat(mending(info.items.armaduras.fullIron[3]))
            }, 1000)
            setTimeout(function(){
                rayos()
                setTimeout(function(){bot.chat(info.efectos.seguerai)},200)
            }, 10000)
            setTimeout(function(){
                rayos()
                setTimeout(function(){bot.chat(info.efectos.seguerai)},200)
            }, 30000)
            setTimeout(function(){
                rayos()
                setTimeout(function(){bot.chat(info.efectos.seguerai)},200)
            }, 45000)
            setTimeout(function(){
                rayos()
                setTimeout(function(){bot.chat(info.efectos.seguerai)},200)
            }, 60000)
            setTimeout(function(){
                rayos()
                setTimeout(function(){bot.chat(info.efectos.seguerai)},200)
            }, 65000)
            setTimeout(function(){
                rayos()
            }, 80000)
            contador_S()
            break
        case 7:
            revivir()
            bot.chat(info.bosses.lvl5)
            infectado2(7)
            spider(8)
            skeleton(8)
            enfermero(10)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.armaduras.fullIron[0]))
                bot.chat(mending(info.items.armaduras.fullIron[1]))
                bot.chat(mending(info.items.armaduras.fullIron[2]))
                bot.chat(mending(info.items.armaduras.fullIron[3]))
            }, 1000)
            contador_S()
            break
        case 8:
            revivir()
            bot.chat(info.bosses.lvl5)
            infectado(10)
            infectado2(10)
            spider(10)
            enfermero(20)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.armaduras.fullIron[0]))
                bot.chat(mending(info.items.armaduras.fullIron[1]))
                bot.chat(mending(info.items.armaduras.fullIron[2]))
                bot.chat(mending(info.items.armaduras.fullIron[3]))

            }, 1000)
            contador_S()
            for(let i = 0;i<info.commandos.expandir_zona.length;i++){
                setTimeout(function(){bot.chat(info.commandos.expandir_zona[i])},i*350)
            }
            break
        case 9:
            revivir()
            bosslvl5(3)
            enfermero(10)
            spider(4)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        case 10:
            revivir()
            bosslvl5(1)
            bosslvl10(9)
            enfermero(10)
            spider(4)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.flechas))
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.arco_clint))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        case 11:
            revivir()
            bosslvl5(6)
            bosslvl10(1)
            enfermero(20)
            spider(10)
            setTimeout(function(){
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        case 12:
            revivir()
            bosslvl5(10)
            bosslvl10(30)
            enfermero(40)
            spider(30)
            setTimeout(function(){
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        case 13:
            revivir()
            bosslvl10(40)
            enfermero(30)
            spider(20)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        case 14:
            revivir()
            bosslvl5(40)
            enfermero(30)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        case 15:
            revivir()
            bosslvl5(30)
            bosslvl10(40)
            spider(70)
            setTimeout(function(){
                bot.chat(mending(info.items.manzana_dorada))
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.elixir_de_la_vida))
                bot.chat(mending(info.items.armaduras.fullDiamond[0]))
                bot.chat(mending(info.items.armaduras.fullDiamond[1]))
                bot.chat(mending(info.items.armaduras.fullDiamond[2]))
                bot.chat(mending(info.items.armaduras.fullDiamond[3]))
            }, 1000)
            contador_S()
            break
        default:
            break
    }
}

function mending(txts){
    for(let i=0; i<txts.length; i++){
        txts=txts.replace('%', '"')
    }
    console.log(txts)
    return txts
}


//=================== SPAWNERS===================

function zombies(cantidad) {
    for (let i = 0; i <= cantidad; i++) {
        let spawn = info.spawnPoint.todos[Math.floor(Math.random() * (info.spawnPoint.todos.length - 0) + 0)]
        bot.chat('/summon zombie ' + spawn)
    }
}

function skeleton(cantidad) {
    for (let i = 0; i <= cantidad; i++) {
        let spawn = info.spawnPoint.comunes[Math.floor(Math.random() * (info.spawnPoint.comunes.length - 0) + 0)]
        bot.chat('/summon skeleton ' + spawn)
    }
}

function spider(cantidad) {
    for (let i = 0; i <= cantidad; i++) {
        let spawn = info.spawnPoint.poco_comunes[Math.floor(Math.random() * (info.spawnPoint.poco_comunes.length - 0) + 0)]
        bot.chat('/summon minecraft:spider ' + spawn+ ` {CustomName:'[{"text":"Mutaracha"}]'}`)
    }
}

function infectado(cantidad) {
    for(let i = 0; i<cantidad; i++){
        setTimeout(function(){
            bot.chat(info.mobs.infectado)
        }, i*150)
    }
}

function infectado2(cantidad) {
    for(let i = 0; i<cantidad; i++){
        setTimeout(function(){
            bot.chat(info.mobs.infectadov2)
        }, i*150)
    }
}

function enfermero(cantidad) {
    for(let i = 0; i<cantidad; i++){
        setTimeout(function(){
            bot.chat(info.mobs.enfermero)
        }, i*150)
    }
}

function bosslvl5(cantidad){
    for(let i= 0 ; i<cantidad; i++){
        setTimeout(function(){
            bot.chat(info.bosses.lvl5)
        }, i*200)
    }
}

function bosslvl10(cantidad){
    for(let i= 0 ; i<cantidad; i++){
        setTimeout(function(){
            bot.chat(info.bosses.lvl10)
        }, i*200)
    }
}

function contador_S(){
    contador_d = setInterval(function(){
        try{
            bot.chat(info.commandos.iniciales[1]+contador)
        contador--
        if(contador==0){
            next()
            clearInterval(contador_d)
        }
        }catch(a){}
    },1000)
}