const sentenceCase = require("to-title-case");
module.exports = function (recipes, type, search) {
  // get the tags
  let tags = [];
  let dedupedTags = [];
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    recipe.tags.forEach((tag) => {
      if (!dedupedTags.includes(tag.toLowerCase())) {
        dedupedTags.push(tag.toLowerCase());
        tags.push({
          id: tag.toLowerCase(),
          label: sentenceCase(tag),
        });
      }
    });
  }

  let html = `<input type="text" name="Search" placeholder="Search..." id="SearchInput" class="my-2 bg-white text-gray-800 py-2 px-4 border-2 border-gray-400">`;
  html += `<div id="RecipeList"><ul class="list my-8 px-8">`;
  tags.forEach((tag) => {
    html += `<h3 class="mt-4 mb-1">${tag.label}</h3>`;
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      let included = false;
      recipe.tags.forEach((t) => {
        if (t.toLowerCase() == tag.id) {
          included = true;
        }
      });
      if (included) {
        html += `
          <li>
            <a href="/recipes/${recipe.slug}/">${recipe.name}</a>
          </li>
      `;
      }
    }
  });

  html += `<h3 class="mt-4 mb-1">Untagged</h3>`;
  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    if (!recipe.tags.length) {
      html += `
        <li>
          <a href="/recipes/${recipe.slug}/">${recipe.name}</a>
        </li>
    `;
    }
  }
  html += `</ul></div>`;

  html += `
  <script>
    const recipes = ${JSON.stringify(recipes)};
    const tags = ${JSON.stringify(tags)};
  </script>`;

  return html;
};
