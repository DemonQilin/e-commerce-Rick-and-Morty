const d = document;

export default async function printCharacter() {
    console.time('Tiempo fetch')
    let obj = await fetch('https://rickandmortyapi.com/api/character');
    console.log(obj);
    let response = await obj.json();
    console.log(response);
    console.timeEnd('Tiempo fetch');
}