const paramsHandler = (filter, ordering, search, page) => {
  const params = {};

  const getFilters = (filter) =>
    filter.map((f) => {
      return (params[f["name"]] = f["value"]);
    });

  if (search) {
    params["search"] = search;
    if (ordering) {
      params["ordering"] = ordering;
    }
  }

  if (page) {
    params["page"] = page;
    if (ordering) {
      params["ordering"] = ordering;
    }
    if (filter) {
      getFilters(filter);
    }
  }
  if (ordering) {
    params["ordering"] = ordering;
  }

  if (filter) {
    getFilters(filter);
  }
  return params;
};

export default paramsHandler;
