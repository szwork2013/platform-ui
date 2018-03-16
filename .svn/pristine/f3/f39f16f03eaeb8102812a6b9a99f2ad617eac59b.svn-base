import {arrayToTree} from 'utils';
import service from 'service';

//把数组转换为antd的Select需要的树形数据
const arrayToSelectTree = (array, labelKey = 'name',
                           id = 'id', pid = 'parentId', children = 'children') => {
  let tree = arrayToTree(array, id, pid, children);

  for (let record of tree)
    constructTreeNode(record, labelKey, id);

  return tree;
}

//构造树节点
const constructTreeNode = (record, labelKey = 'name', id = 'id') => {
  record.key = record[id];
  record.title = record[labelKey];
  record.value = service.parseRecordUrl(record);
  record.childrenLink = service.parseRecordChildrenUrl(record);
  record.isLeaf = record.isLeaf;

  if (record.children) { //如果有儿子，则为所有儿子构造树节点
    for (let r of record.children)
      constructTreeNode(r, labelKey, id);
  }
}

//构造请求儿子节点数据的链接
const getChildrenLink = (url, searchParam, parentKey = 'parent', expandAllDescendants = false) => {

  if (!searchParam || !searchParam.filter || !searchParam.filter.jpql)
    return url;

  let link = url + '?clazz=';

  //根据树的jpql构造获取儿子jpql
  const {projection, filter} = searchParam;

  //自己指定了获取儿子的jpql
  if (filter.childrenJpql)
    return link + '&childrenJpql=' + filter.childrenJpql;

  let id = service.extractIdFromRecordHref(url);
  let where = 'o.' + parentKey + '.id = ' + id;

  let childrenJpql = filter.jpql.toLowerCase();

  //一次返回选中节点的所有后代节点
  if (expandAllDescendants) {
    where = parentKey + '.id = ' + id;
    for (let key = parentKey + parentKey; ; key += parentKey) {
      if (childrenJpql.indexOf(' ' + key.toLowerCase() + ' ') < 0) break;
      where += ' or ' + key + '.id = ' + id;
    }
  }

  const wherePos = childrenJpql.indexOf('where');
  if (wherePos > 0) {
    childrenJpql = filter.jpql.substring(0, wherePos);
  }
  link += '&childrenJpql=' + childrenJpql + ' where ' + where;

  if (projection)
    link += '&projection=' + projection;

  return link;
}

//返回所有子孙节点ID列表
const getIdListOfAllDescendants = (idList, record, id = 'id') => {
  if (!record.isLeaf)
    idList.push(record[id] + '');
  if (record.children) { //如果有儿子，则为所有儿子构造树节点
    for (let r of record.children)
      getIdListOfAllDescendants(idList, r, id);
  }
}

export default {
  arrayToSelectTree,
  constructTreeNode,
  getChildrenLink,
  getIdListOfAllDescendants,
}
