const endpoint = "https://api.le-systeme-solaire.net/rest.php/bodies/";
const planets = ["venus", "mercury", "earth"];
const data = {};

// Fetch each planet we have pre-defined, store them in an intermediate global variable, and replace part of the DOM's text content
planets.forEach((val) => {
    (async () => {
        console.log(`${endpoint}${val}`);
        let resp = await fetch(`${endpoint}${val}`);
        console.log(resp);
        let json = await resp.json();
        console.log(json);
        data[val] = json;

        /* 
        It's a reasonably safe assumption that the structure of the partially loaded DOM
        will contain the required node to perform a textual replacement on with the
        fetched data from the API
        */
        replaceNodeContent(val);
    })()
});

/**
 * 
 * @param {string} name The key used to access the global data object. It is the English name of the desired planet
 * 
 * @returns A string of a human readable notation of the planet's mass using scientific notation
 */
function getMass(name) {
    // data[planet].mass object: {massValue: float, massExponent: int}
    let raw = data[name].mass;
    let mass = raw["massValue"];
    let exponent = raw["massExponent"];

    return `${mass}e${exponent} kg`;
}

/**
 * 
 * @param {string} name The key used to access the global data object. It is the English name of the desired planet
 *
 * @returns A string of the planet's gravity in metres per second squared. (m/s²)
 */
function getGravity(name) {
    let gravity = data[name].gravity;

    return `${gravity} m/s²`;
}

/**
 * 
 * @param {string} name The key used to access the global data object. It is the English name of the desired planet
 *
 * @returns A string of the planet's radius in km.
 */
function getPolarRadius(name) {
    let polarRadius = data[name].polarRadius;

    return `${polarRadius} km`;
}

/**
 * 
 * @param {string} name The key used to access the global data object. It is the English name of the desired planet
 *
 * Replaces the contents of a ul list's li elements with factual data about the related planet
 */
function replaceNodeContent(name) {
    let ele = document.getElementById(`${name}-facts`);
    let massNode = ele.children[0];
    let RadiusNode = ele.children[1];
    let GravityNode = ele.children[2];

    massNode.textContent = `Mass: ${getMass(name)}`;
    RadiusNode.textContent = `Radius: ${getPolarRadius(name)}`;
    GravityNode.textContent = `Gravity: ${getGravity(name)}`;
    console.log(ele)
}