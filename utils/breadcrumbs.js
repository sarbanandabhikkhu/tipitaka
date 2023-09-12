import utilities from "./utilities.js";

const breadcrumbs = {};

breadcrumbs.config = {
  tree_data_url: "../cscd/tipitaka_tree.json",
  breads: "",
  layer: -1,
  index: 0,
};

breadcrumbs.dir_file = (items) => {
  const itms = [];

  items.map((item) => {
    if ("href" in item) {
      itms.push({
        type: "file",
        _id: item.id,
        href: item.href,
        name: item.name,
      });
      return;
    }
    itms.push({
      type: "folder",
      name: item.name,
    });
  });
  return itms;
};

breadcrumbs.dir = (current, cur_layer, cur_index) => {
  const { breads, layer, index } = breadcrumbs.config;
  if (breadcrumbs.config.layer !== cur_layer) {
    breadcrumbs.config.layer = cur_layer;
    breadcrumbs.config.breads = `${breadcrumbs.config.breads}/${current}`;
  }

  const split = breadcrumbs.config.breads.split("/");
  if (split[split.length - 1] === current) {
    delete split[cur_layer];
    const txt = split.map((t) => {
      if (t === "") return;
      return `/${t}`;
    });
    breadcrumbs.config.breads = `${txt}/${current}`;
    console.log(split);
  }

  console.log(breadcrumbs.config.layer);

  return breadcrumbs.config.breads;
};

breadcrumbs.create = (data, breadcrumbs_data, layer, callback) => {
  if (!Array.isArray(data)) {
    breadcrumbs_data.push({
      name: data.name,
      items: breadcrumbs.dir_file(data.items),
      dir: breadcrumbs.dir(data.name, layer, 0),
    });
    return callback(data.items, breadcrumbs_data);
  }

  if (Array.isArray(data)) {
    data.map((item, i) => {
      if ("href" in item) return;
      breadcrumbs_data.push({
        name: item.name,
        items: breadcrumbs.dir_file(item.items),
        dir: breadcrumbs.dir(item.name, layer, i),
      });
      return callback(item.items, breadcrumbs_data);
    });
  }
};

breadcrumbs.init = () => {
  const tree_data = breadcrumbs.config.tree_data_url;
  const breads_data = [];

  utilities.load(tree_data, (data) => {
    breadcrumbs.create(data, breads_data, 0, (item, breads) => {
      breadcrumbs.create(item, breads, 1, (item, breads) => {
        breadcrumbs.create(item, breads, 2, (item, breads) => {
          // breadcrumbs.create(item, breads, 3, (item, breads) => {
          //   breadcrumbs.create(item, breads, 4, (item, breads) => {});
          // });
        });
      });
    });
  });

  console.log(breads_data);
};

export default breadcrumbs;
