import { alliances } from "./alliances";
import { heroes } from "./heroes";
const heroesList = heroes
const allianceTargetList = alliances


let originAllianceList = {
    "primordial": 0,
    "knight": 0,
    "summoner": 0,
    "scaled": 0,
    "assassin": 0,
    "bloodbound": 0,
    "brawny": 0,
    "brute": 0,
    "champion": 0,
    "deadeye": 0,
    "demon": 0,
    "dragon": 0,
    "druid": 0,
    "healer": 0,
    "heartless": 0,
    "human": 0,
    "hunter": 0,
    "insect": 0,
    "knight": 0,
    "mage": 0,
    "savage": 0,
    "spirit": 0,
    "troll": 0,
    "vigilant": 0,
    "void": 0,
    "warlock": 0,
    "warrior": 0
}
let allianceList = {...originAllianceList};
let activeHeroList = []
let activeAllianceList = []


const generateHeroText = (word) => {
    var newWord = "";
    newWord += word.substring(0,1).toUpperCase()

    for(var i = 1; i < word.length; i++)
    {
        if(word[i] <= 'Z' && word[i] >= 'A')
        {
            newWord += ' ' + word[i];
        }
        else
        {
            newWord += word[i];
        }
    }

    return newWord
}

for (let heroName of Object.keys(heroesList)) {
    const button = document.createElement('button')
    let newHeroName = generateHeroText(heroName)
    button.textContent = `  ${newHeroName}  `
    button.setAttribute('id',`${heroName}`)
    let elementId = `t${(heroesList[heroName].tier)}`
    document.querySelector(`#${elementId}`).appendChild(button)
    document.querySelector(`#${heroName}`).addEventListener('click', function(e){
        if(!activeHeroList.includes(`${heroName}`)){
            heroesList[heroName].alliance.forEach(alliance => {
                allianceList[alliance] ++
            })
        }
        activeHeroList.push(heroName)
        generateActiveAlliance()
        render()
    })
}


const generateActiveAlliance = () => {
    activeAllianceList = []
    for (const alliance in allianceList) {
        let currentAlliance = allianceList[alliance]
        let targetAlliance = allianceTargetList[alliance]
        let allianceLevel = 0
        for (let index = 0; index < targetAlliance.length; index++) {
            console.log(`${alliance}: ${currentAlliance}`)
            if(currentAlliance >= targetAlliance[index]){
                allianceLevel++
            } else {
                break;
            }
        }
        if(allianceLevel > 0){
            activeAllianceList.push({[alliance]: allianceLevel})
        }
    }
}

const render = () => {
    document.getElementById("active-alliance").innerHTML = "";
    for (const alliance of activeAllianceList) {
        const label = document.createElement('label')
        for(const key in alliance){
            label.textContent = `  ${key}: ${alliance[key]}  `
        }
        document.querySelector("#active-alliance").appendChild(label)
    }
    document.getElementById("active-heroes").innerHTML = "";
    for (const hero of activeHeroList) {
        const button = document.createElement('button')
        button.textContent = `  ${generateHeroText(hero)}  `
        document.querySelector("#active-heroes").appendChild(button)
        button.addEventListener('click', function(e){
            heroesList[hero].alliance.forEach(alliance => {
                allianceList[alliance] --
            })
            const index = activeHeroList.indexOf(hero);
            if (index > -1) {
                activeHeroList.splice(index, 1);
            }
            generateActiveAlliance()
            render()
        })
    }
}

document.querySelector("#clear").addEventListener('click', function(e){
    activeHeroList = []
    activeAllianceList = []
    allianceList = {...originAllianceList}
    render()
})