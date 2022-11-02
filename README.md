# Test challenge for frontend developers

Link: https://textiles-ce5b3.web.app
Back (git): https://github.com/gsi102/textiles-back.git
Server: https://textiles-back.herokuapp.com/

> _TASK_: Using any language and any framework implement your nice solution following the requirements.

## Requirements:

- Request API to get list of products. For this challenge please mock a server and use the fake data (./dist/data folder)
- Display the list using paging with possibility to change items count, e.q. 4, 6 (see ./dist/data/products_view.jpg)
- As a bonus add a feature to switch the representation between 2 modes (gallery/list)
- On an item click request a product and display details on the right panel (see ./dist/img/product_view.jpg)
- Add a panel with tabs: _Textiles_, _Rules_, _Suppliers_ (data for last 2 omitted for simplicity, leave content blank)
- Add a slider to show product images
- Add buttons to save and share the product
  Note: it's not required to follow provided views, feel free to show creativity.

## App functionality:

The App uses simple API. Key for theme is set with a value in the **Localstorage**

A responsive layout (usable on mobile) functionality:

- Night and day mode can be switched on the handler click in the right top corner (by inverting the colors)
- The main page includes list of products with different appearance settings: grid/list, 4/6 items per page, pagination
- When users click on a product an additional block with product data appears on the right side (fetching an additional info from the server).

# Stack

Front:

- React
- Redux
- RTK Query
- Typescript
- SASS

Back:

- NodeJS (express)
- Typescript

## Part 2. 

**I will describe the main ideas:**

- In fact, we need to build a graph based on comparing the difference in some values of elements of some one class (Textiles).

- This graph should have the form of a 3d plot. For the convenience of visual perception, I would put the point 0, 0, 0 of the graph as equal to rgb (127, 127, 127). Because if we take the rgb equivalent (0,0,0) for 0, then all the elements of the graph will be too crowded.

- At first, I thought to improve performance by add onclick listener event not on each element, but on the entire zone and track the coordinates of the click, correlating it with the coordinates of the element that should be in this area. But in the 3D zone it would be very difficult. I have to think about it more.

- Objects in the database obviously must have references to other objects or their IDs, which are logically related to the first ones. I would call this entity the Relational Array

- When setting a limit on showing the nearest points, we take the first N points from  the Relational Array which contains ranked elements.

- As soon as we isolate an array of close elements, the graph should be rebuilt based on this new array (isolated elements). We take the selected number of points for isolation from the Relational Array of the object we clicked on and rebuild the graph based on the new state.
