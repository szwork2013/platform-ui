import PropTypes from 'prop-types';
import {Link} from 'dva/router';
import {Badge, Icon, Menu} from 'antd';
import service from 'service';

//导航菜单
const NavMenu = (props) => {
  //解构参数
  const {
    items, //调用者注入：菜单项数组
    StyledMenu, //调用者注入：带样式的菜单
    defaultPath,  //缺省选中的菜单项对应的路由路径
    rootPath, //路由的根路径
    routeMapMenu = true, //是否有路由映射的菜单
    ...rest
  } = props;

  //计算缺省的菜单项的key
  let defaultOpenKeys = [];
  let defaultKey = computeDefaultKey(defaultPath, rootPath, items);
  if (defaultKey < 0) {
    defaultKey = 1;
    defaultOpenKeys.push(defaultKey + '');
  }
  let defaultSelectedKeys = props.defaultSelectedKeys || [defaultKey + ''];

  //计算缺省要展开的菜单项的key的数组
  let defaultExpandedKeys = [];
  computeDefaultExpanedKeys(items, 0, defaultExpandedKeys);

  //构造菜单属性
  defaultOpenKeys = defaultOpenKeys.concat(defaultExpandedKeys);

  let menuProps = {
    defaultOpenKeys,
    defaultSelectedKeys,
  }

  //显示UI
  return (
    <StyledMenu {...rest} {...menuProps}>
      {renderItems(items, rootPath)}
    </StyledMenu>
  );

  //计算缺省的菜单项的key
  function computeDefaultKey(defaultPath, rootPath, items, parentIndex = 0) {
    let index = 0;
    for (let item of items) {
      const key = parentIndex * 100 + index + 1;
      const toPath = rootPath + '/' + item.path;

      if (routeMapMenu && defaultPath.endsWith(toPath))
        return key;

      if (!routeMapMenu && (defaultPath.endsWith('/' + item.path) ||
          defaultPath.includes('/' + item.path + '/')))
        return key;

      if (item.children) {
        const childrenKey = computeDefaultKey(defaultPath, toPath, item.children, key);
        if (childrenKey >= 0) {
          defaultOpenKeys.push(key + '');
          return childrenKey;
        }
      }

      index++;
    }

    return -1;
  }

  //计算缺省要展开的菜单项的key数组
  function computeDefaultExpanedKeys(items, parentIndex = 0, expandedKeys = []) {
    let index = 0;
    for (let item of items) {
      const key = parentIndex * 100 + index + 1;
      if (item.expanded) expandedKeys.push(key + '');

      if (item.children) {
        computeDefaultExpanedKeys(item.children, key, expandedKeys);
      }

      index++;
    }

    return expandedKeys;
  }

  //构造菜单项
  function renderItems(items, rootPath, parentIndex = 0) {
    return items.map((item, index) => {
      const key = parentIndex * 100 + index + 1;
      const toPath = rootPath + '/' + item.path;

      return renderMenuItem({item, key, toPath});
    }) // end of map
  }

  //构造一个菜单项
  function renderMenuItem({item, key, toPath}) {
    if (!service.authz(item.permission)) return null;
    if (item.children) { //有子菜单
      return (
        <Menu.SubMenu key={key}
                      title={
                        <span>
              <Icon type={item.icon}/>
              <span>{item.title}</span>
            </span>
                      }
        >
          {renderItems(item.children, toPath, key)}
        </Menu.SubMenu>
      )
    }

    //无子菜单的菜单项
    let badgeProps;
    if (item.badgeCount) {
      badgeProps = {
        style: {fontSize: 12, marginBottom: 20, marginLeft: 5, backgroundColor: '#7FFF00'},
        count: item.badgeCount,
        overflowCount: item.overflowCount,
      };
    }

    if (key != defaultKey) { //不是选中的菜单项
      return (
        <Menu.Item key={key}>
          <Link key={'link-' + key} to={toPath}>
            <Icon key={'icon-' + key} type={item.icon}/>
            <span>{item.title}</span>
            {badgeProps && <Badge {...badgeProps}/>}
          </Link>
        </Menu.Item>
      )
    }
    else { //选中的菜单项
      return (
        <Menu.Item key={key}>
          <Icon key={'icon-' + key} type={item.icon}/>
          <span>{item.title}</span>
          {badgeProps && <Badge {...badgeProps}/>}
        </Menu.Item>
      )
    }
  }
}

NavMenu.propTypes = {
  items: PropTypes.array.isRequired,
  defaultSelectedKeys: PropTypes.array,
  StyledMenu: PropTypes.object.isRequired,
  defaultPath: PropTypes.string.isRequired,
  rootPath: PropTypes.string.isRequired,
}

export default NavMenu;
