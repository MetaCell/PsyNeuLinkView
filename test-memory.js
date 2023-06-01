// initial page load url: Google Maps
function url() {
    return 'http://localhost:3000/';
}

const elementSelector = '#root > div > div.jss10 > div.jss12.MuiBox-root.css-0 > div.jss16.MuiBox-root.css-0 > div > div > div:nth-child(2) > div > div > div:nth-child(2) > div:nth-child(2)';
const dragAmount = 200;
const repetitions = 7;

async function dragLeft(page) {
    const draggableElement = await page.$(elementSelector);
    const boundingBox = await draggableElement.boundingBox();
    const targetX = boundingBox.x - dragAmount;

    await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(targetX, boundingBox.y + boundingBox.height / 2);
    await page.mouse.up();
}

async function dragRight(page) {
    const draggableElement = await page.$(elementSelector);
    const boundingBox = await draggableElement.boundingBox();
    const targetX = boundingBox.x + boundingBox.width + dragAmount;

    await page.mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(targetX, boundingBox.y + boundingBox.height / 2);
    await page.mouse.up();
}

async function action(page) {
    for(let i = 0; i < repetitions; i++) {
        await dragLeft(page);
        await page.waitForTimeout(1000);
        await dragRight(page);
        await page.waitForTimeout(1000);
        await page.evaluate(() => {
            console.log(i);
        });
    }
}


module.exports = {action, url};
