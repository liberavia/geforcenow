# Controller support

## Mall-Layout vs Grid-Layout

To be identified by used url path

Mall-Layout (Startpage)
```
https://play.geforcenow.com/mall/#/layout/games
```
Grid layout (Show more)
```
https://play.geforcenow.com/mall/#/layout/games/gameSectionGrid?search=false
```

## Gamecard image (Grid and Mall-Layout)

Example hover image (grid):
```
// function for evaluating xpath and returning its element
function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
// use function 
const myXPathElement = getElementByXpath('/html/body/gfn-root/gfn-main-content/div/div/gfn-sidebar/mat-drawer-container/mat-drawer-content/div/div/gfn-game-section-grid/div/div[2]/cdk-virtual-scroll-viewport/div[1]/div/div[1]/gfn-games-grid-row/div/div/div[1]/gfn-game-tile/div/div[1]/div/img');
// set class to enlarged image (default: 'default-img)
myXPathElement.className='enlarged-img';
```
Compare Gamecard-Elements in Grid:
```
// First element
/html/body/gfn-root/gfn-main-content/div/div/gfn-sidebar/mat-drawer-container/mat-drawer-content/div/div/gfn-game-section-grid/div/div[2]/cdk-virtual-scroll-viewport/div[1]/div/div[1]/gfn-games-grid-row/div/div/div[1]/gfn-game-tile/div/div[1]/div/img
// Second element
/html/body/gfn-root/gfn-main-content/div/div/gfn-sidebar/mat-drawer-container/mat-drawer-content/div/div/gfn-game-section-grid/div/div[2]/cdk-virtual-scroll-viewport/div[1]/div/div[1]/gfn-games-grid-row/div/div/div[2]/gfn-game-tile/div/div[1]/div/img
```
## Scroll into view

```
document.querySelector('#section-ceb52844-dc97-4a88-a248-80c4af730e5d > div > gfn-carousel > div > div > cdk-virtual-scroll-viewport > div.cdk-virtual-scroll-content-wrapper > div.item-container.first.ng-star-inserted > gfn-game-tile > div > div.crimson.constants-position-relative > div > img').scrollIntoView({
    behavior: "smooth",
    block:    "start",
});
```