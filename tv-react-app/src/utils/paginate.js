import _ from "lodash";

export function paginate (items,currentPage,pagesize){
    const startind = (currentPage-1)*pagesize;
   return _(items).slice(startind).take(pagesize).value()
}