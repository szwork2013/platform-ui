import React from 'react'
import PropTypes from 'prop-types'

import { Redirect, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import Layout from './Layout';


//模块路由
const mainRoute = (props) => {
  const {
    match,
  } = props;

  //动态加载路由

  //办公设备
  const companyRoute = dynamic({
    app,
    component: () => import('./itconsumable/company')
  });
  const allDepartmentRoute = dynamic({
    app,
    component: () => import('./itconsumable/alldepartment')
  });
  const departmentRoute = dynamic({
    app,
    component: () => import('./itconsumable/department')
  });
  const unitsRoute = dynamic({
    app,
    component: () => import('./itconsumable/units')
  });
  const materialCategoryRoute = dynamic({
      app,
      component: () => import('./material/MaterialCategoryView')
  });
    const materialCatalogueRoute = dynamic({
      app,
      component: () => import('./material/MaterialCatalogueView')
  });
    const materialImportRoute = dynamic({
      app,
      component: () => import('./material/MaterialImportView')
  });
  const materialRoute = dynamic({
    app,
    component: () => import('./material')
});
  const itConsumableSupplierRoute = dynamic({
    app,
    component: () => import('./supplier/ItConsumableView')
});

  //2018.1.24 yjx  办公设备
  const officecompanyRoute = dynamic({
    app,
    component: () => import('./itoffice/company')
});
  const officeallDepartmentRoute = dynamic({
    app,
    component: () => import('./itoffice/alldepartment')
});
  const officedepartmentRoute = dynamic({
    app,
    component: () => import('./itoffice/department')
});
  const materialOfficeCataloguelRoute = dynamic({
    app,
    component: () => import('./material/OfficeCatalogueView')
});
  const materialOfficeEquipmentImportRoute = dynamic({
    app,
    component: () => import('./material/EquipmentImportView')
});

  //2018.1.25 yjx 非安装设备
  const uninstallCompanyRoute = dynamic({
    app,
    component: () => import('./uninstall/company')
});
  const uninstallAllDepartmentRoute = dynamic({
    app,
    component: () => import('./uninstall/alldepartment')
});
  const uninstallDepartmentRoute = dynamic({
    app,
    component: () => import('./uninstall/department')
});
  const uninstallUnitsRoute = dynamic({
    app,
    component: () => import('./uninstall/units')
});
  const materialUnInstallCategoryRoute = dynamic({
    app,
    component: () => import('./material/UnInstallCategoryView')
});
  const materialUnInstallInformationRoute = dynamic({
    app,
    component: () => import('./material/UnInstallInformationView')
});
  const materialUnInstallImportRoute = dynamic({
    app,
    component: () => import('./material/UnInstallImportView')
});

  //It生产设备
  const itproduceUnitsRoute = dynamic({
    app,
    component: () => import('./itproduce/units')
});
  const materialItProduceCategoryRoute = dynamic({
    app,
    component: () => import('./material/ProduceCategoryView')
});
  const materialItProduceInformationRoute = dynamic({
    app,
    component: () => import('./material/ProduceInformationView')
});
  const materialItProduceImportRoute = dynamic({
    app,
    component: () => import('./material/ProduceImportView')
});

  //It工程物资
  const engineerMaterialCompanyRoute = dynamic({
    app,
    component: () => import('./engineermaterial/company')
});
  const engineerMaterialAllDepartmentRoute = dynamic({
    app,
    component: () => import('./engineermaterial/alldepartment')
});
  const engineerMaterialDepartmentRoute = dynamic({
    app,
    component: () => import('./engineermaterial/department')
});
  const engineerMaterialCategoryRoute = dynamic({
    app,
    component: () => import('./material/EngineerMaterialCategoryView')
});
  const engineerMaterialInformationRoute = dynamic({
    app,
    component: () => import('./material/EngineerMaterialInformationView')
});
  const engineerMaterialImportRoute = dynamic({
    app,
    component: () => import('./material/EngineerMaterialImportView')
});

  //It办公用品
  const officesuppliesCompanyRoute = dynamic({
    app,
    component: () => import('./officesupplies/company')
});
  const officesuppliesAllDepartmentRoute = dynamic({
    app,
    component: () => import('./officesupplies/alldepartment')
});
  const officesuppliesUnitsRoute = dynamic({
    app,
    component: () => import('./officesupplies/units')
});
  const officesuppliesDepartmentRoute = dynamic({
    app,
    component: () => import('./officesupplies/department')
});
  const officesuppliesCategoryRoute = dynamic({
    app,
    component: () => import('./material/OfficeSuppliesCategoryView')
});
  const officesuppliesInformationRoute = dynamic({
    app,
    component: () => import('./material/OfficeSuppliesCatalogueView')
});
  const officesuppliesImportRoute = dynamic({
    app,
    component: () => import('./material/OfficeSuppliesImportView')
});
  const officesuppliessupplierRoute = dynamic({
    app,
    component: () => import('./supplier/OfficeSuppliesView')
});

//2018.1.30 yjx 劳保用品
  const labourSuppliesCompanyRoute = dynamic({
    app,
    component: () => import('./laboursupplies/company')
});
  const labourSuppliesAllDepartmentRoute = dynamic({
    app,
    component: () => import('./laboursupplies/alldepartment')
});
  const labourSuppliesUnitsRoute = dynamic({
    app,
    component: () => import('./laboursupplies/units')
});
  const labourSuppliesDepartmentRoute = dynamic({
    app,
    component: () => import('./laboursupplies/department')
});
  const labourSuppliesCategoryRoute = dynamic({
    app,
    component: () => import('./material/LabourSuppliesCategoryView')
});
  const labourSuppliesInformationRoute = dynamic({
    app,
    component: () => import('./material/LabourSuppliesCatalogueView')
});
  const labourSuppliesImportRoute = dynamic({
    app,
    component: () => import('./material/LabourSuppliesImportView')
});
  const labourSuppliessupplierRoute = dynamic({
    app,
    component: () => import('./supplier/LabourSuppliessupplierView')
});

  //轮胎
  const tyreCompanyRoute = dynamic({
    app,
    component: () => import('./tyre/company')
});
  const tyreAllDepartmentRoute = dynamic({
    app,
    component: () => import('./tyre/alldepartment')
});
  const tyreUnitsRoute = dynamic({
    app,
    component: () => import('./tyre/units')
});
  const tyreDepartmentRoute = dynamic({
    app,
    component: () => import('./tyre/department')
});
  const tyreCategoryRoute = dynamic({
    app,
    component: () => import('./material/TyreCategoryView')
});
  const tyreInformationRoute = dynamic({
    app,
    component: () => import('./material/TyreCatalogueView')
});
  const tyreImportRoute = dynamic({
    app,
    component: () => import('./material/TyreImportView')
});
  const tyreSupplierRoute = dynamic({
    app,
    component: () => import('./supplier/TyreView')
});

  //软件
  const softCompanyRoute = dynamic({
    app,
    component: () => import('./soft/company')
});
  const softAllDepartmentRoute = dynamic({
    app,
    component: () => import('./soft/alldepartment')
});
  const softUnitsRoute = dynamic({
    app,
    component: () => import('./soft/units')
});
  const softDepartmentRoute = dynamic({
    app,
    component: () => import('./soft/department')
});
  const softCategoryRoute = dynamic({
    app,
    component: () => import('./material/SoftCategoryView')
});
  const softInformationRoute = dynamic({
    app,
    component: () => import('./material/SoftCatalogueView')
});
  const softImportRoute = dynamic({
    app,
    component: () => import('./material/SoftImportView')
});
  const softSupplierRoute = dynamic({
    app,
    component: () => import('./supplier/SoftView')
});

  //软件实验室用品
  const laboratorySuppliesCompanyRoute = dynamic({
    app,
    component: () => import('./laboratorysupplies/company')
});
  const laboratorySuppliesAllDepartmentRoute = dynamic({
    app,
    component: () => import('./laboratorysupplies/alldepartment')
});
  const laboratorySuppliesUnitsRoute = dynamic({
    app,
    component: () => import('./laboratorysupplies/units')
});
  const laboratorySuppliesDepartmentRoute = dynamic({
    app,
    component: () => import('./laboratorysupplies/department')
});
  const laboratorySuppliesCategoryRoute = dynamic({
    app,
    component: () => import('./material/LaboratorySuppliesCategoryView')
});
  const laboratorySuppliesInformationRoute = dynamic({
    app,
    component: () => import('./material/LaboratorySuppliesCatalogueView')
});
  const laboratorySuppliesImportRoute = dynamic({
    app,
    component: () => import('./material/LaboratorySuppliesImportView')
});
  const laboratorySuppliesSupplierRoute = dynamic({
    app,
    component: () => import('./supplier/LaboratorySuppliesView')
});

  //物资采购

  //it耗材
  const purchaseRoute = dynamic({
    app,
    component: () => import('./itconsumable/purchase')
  });
  const unitsMaterialPurchaseRoute = dynamic({
    app,
    component: () => import('./itconsumable/purchase/UnitsView')
  });
  //it办公设备
  const itOfficePurchaseRoute = dynamic({
    app,
    component: () => import('./itoffice/purchase')
  });
  //生产设备
  const unitsITOfficePurchaseRoute = dynamic({
    app,
    component: () => import('./itproduce/purchase/UnitsView')
  });
  //办公用品
  const officeSuppliesPurchaseRoute = dynamic({
    app,
    component: () => import('./officesupplies/purchase')
  });
  const unitsOfficeSuppliesPurchaseRoute = dynamic({
    app,
    component: () => import('./officesupplies/purchase/UnitsView')
  });
  //劳保用品
  const labourSuppliesPurchaseRoute = dynamic({
    app,
    component: () => import('./laboursupplies/purchase')
  });
  const unitsLabourSuppliesPurchaseRoute = dynamic({
    app,
    component: () => import('./laboursupplies/purchase/UnitsView')
  });
  //非安装设备
  const uninstallEquipmentPurchaseRoute = dynamic({
    app,
    component: () => import('./uninstall/purchase')
  });
  const unitsUninstallEquipmentPurchaseRoute = dynamic({
    app,
    component: () => import('./uninstall/purchase/UnitsView')
  });

  //工程物资
  const hasNotPurchaseRoute = dynamic({
    app,
    component: () => import('./engineermaterial/company/View/HasNotPurchaseView')
});
  const hasPurchaseRoute = dynamic({
    app,
    component: () => import('./engineermaterial/company/View/HasPurchaseView')
});
  const engineerMaterialPurchaseRoute = dynamic({
    app,
    component: () => import('./engineermaterial/purchase/View')
});

  //轮胎
  const tyrePurchaseRoute = dynamic({
    app,
    component: () => import('./tyre/purchase')
});
  const unitsTyrePurchaseRoute = dynamic({
    app,
    component: () => import('./tyre/purchase/UnitsView')
});

  //软件
  const softPurchaseRoute = dynamic({
    app,
    component: () => import('./soft/purchase')
});
  const unitsSoftPurchaseRoute = dynamic({
    app,
    component: () => import('./soft/purchase/UnitsView')
});

  //实验室用品
  const laboratorySuppliesPurchaseRoute = dynamic({
    app,
    component: () => import('./laboratorysupplies/purchase')
});
  const unitsLaboratorySuppliesPurchaseRoute = dynamic({
    app,
    component: () => import('./laboratorysupplies/purchase/UnitsView')
});


//物资领用

  const drawRoute = dynamic({
    app,
    component: () => import('./draw')
});

  //供应商
  const supplierRoute = dynamic({
    app,
    component: () => import('./supplier')
});

  //停产物资
  const stopProductionMaterialRoute = dynamic({
    app,
    component: () => import('./material/StopProductionMaterialView')
});

  //统计
  const statisticRoute = dynamic({
    app,
    component: () => import('./statistic')
});
  //领用统计
  const statisticDrawRoute = dynamic({
    app,
    component: () => import('./statistic/DrawStatisticFrom')
});

  const rootPath = match.path;
  return (
    <Layout {...props}>
      <Switch>
        <Redirect exact from={rootPath} to={rootPath + '/consumable/company'} push={true} />

        <Route path={rootPath + '/consumable/company'} component={companyRoute} />
        <Route path={rootPath + '/consumable/alldepartment'} component={allDepartmentRoute} />
        <Route path={rootPath + '/consumable/department'} component={departmentRoute} />
        <Route path={rootPath + '/consumable/units'} component={unitsRoute} />
        <Route path={rootPath + '/consumable/materialsearch'} component={materialRoute} />
        <Route path={rootPath + '/consumable/materialsetting/materialcategory'} component={materialCategoryRoute} />
        <Route path={rootPath + '/consumable/materialsetting/materialcatalogue'} component={materialCatalogueRoute} />
        <Route path={rootPath + '/consumable/materialsetting/materialimport'} component={materialImportRoute} />
        <Route path={rootPath + '/consumable/materialsetting/supplier'} component={itConsumableSupplierRoute}/>

        <Route path={rootPath + '/officeequipment/company'} component={officecompanyRoute} />
        <Route path={rootPath + '/officeequipment/alldepartment'} component={officeallDepartmentRoute} />
        <Route path={rootPath + '/officeequipment/department'} component={officedepartmentRoute} />
        <Route path={rootPath + '/officeequipment/materialmanagement/catalogue'} component={materialOfficeCataloguelRoute} />
        <Route path={rootPath + '/officeequipment/materialmanagement/equipmentimport'} component={materialOfficeEquipmentImportRoute} />

        <Route path={rootPath + '/uninstallequipment/company'} component={uninstallCompanyRoute} />
        <Route path={rootPath + '/uninstallequipment/alldepartment'} component={uninstallAllDepartmentRoute} />
        <Route path={rootPath + '/uninstallequipment/department'} component={uninstallDepartmentRoute} />
        <Route path={rootPath + '/uninstallequipment/units'} component={uninstallUnitsRoute} />
        <Route path={rootPath + '/uninstallequipment/materialsetting/category'} component={materialUnInstallCategoryRoute} />
        <Route path={rootPath + '/uninstallequipment/materialsetting/equipmentinformation'} component={materialUnInstallInformationRoute} />
        <Route path={rootPath + '/uninstallequipment/materialsetting/equipmentimport'} component={materialUnInstallImportRoute} />

        <Route path={rootPath + '/itproduceequipment/units'} component={itproduceUnitsRoute} />
        <Route path={rootPath + '/itproduceequipment/materialsetting/category'} component={materialItProduceCategoryRoute} />
        <Route path={rootPath + '/itproduceequipment/materialsetting/equipmentinformation'} component={materialItProduceInformationRoute} />
        <Route path={rootPath + '/itproduceequipment/materialsetting/equipmentimport'} component={materialItProduceImportRoute} />

        <Route path={rootPath + '/engineermaterial/company'} component={engineerMaterialCompanyRoute} />
        <Route path={rootPath + '/engineermaterial/alldepartment'} component={engineerMaterialAllDepartmentRoute} />
        <Route path={rootPath + '/engineermaterial/department'} component={engineerMaterialDepartmentRoute} />
        <Route path={rootPath + '/engineermaterial/materialsetting/engineermaterialcategory'} component={engineerMaterialCategoryRoute} />
        <Route path={rootPath + '/engineermaterial/materialsetting/engineermaterialinformation'} component={engineerMaterialInformationRoute} />
        <Route path={rootPath + '/engineermaterial/materialsetting/engineermaterialimport'} component={engineerMaterialImportRoute} />

        <Route path={rootPath + '/officesupplies/company'} component={officesuppliesCompanyRoute} />
        <Route path={rootPath + '/officesupplies/alldepartment'} component={officesuppliesAllDepartmentRoute} />
        <Route path={rootPath + '/officesupplies/units'} component={officesuppliesUnitsRoute} />
        <Route path={rootPath + '/officesupplies/department'} component={officesuppliesDepartmentRoute} />
        <Route path={rootPath + '/officesupplies/materialsetting/officesuppliescategory'} component={officesuppliesCategoryRoute} />
        <Route path={rootPath + '/officesupplies/materialsetting/officesuppliesCatalogue'} component={officesuppliesInformationRoute} />
        <Route path={rootPath + '/officesupplies/materialsetting/officesuppliesimport'} component={officesuppliesImportRoute} />
        <Route path={rootPath + '/officesupplies/materialsetting/supplier'} component={officesuppliessupplierRoute}/>

        <Route path={rootPath + '/other/laboursupplies/company'} component={labourSuppliesCompanyRoute} />
        <Route path={rootPath + '/other/laboursupplies/alldepartment'} component={labourSuppliesAllDepartmentRoute} />
        <Route path={rootPath + '/other/laboursupplies/units'} component={labourSuppliesUnitsRoute} />
        <Route path={rootPath + '/other/laboursupplies/department'} component={labourSuppliesDepartmentRoute} />
        <Route path={rootPath + '/other/laboursupplies/materialsetting/laboursuppliescategory'} component={labourSuppliesCategoryRoute} />
        <Route path={rootPath + '/other/laboursupplies/materialsetting/laboursuppliesCatalogue'} component={labourSuppliesInformationRoute} />
        <Route path={rootPath + '/other/laboursupplies/materialsetting/laboursuppliesimport'} component={labourSuppliesImportRoute} />
        <Route path={rootPath + '/other/laboursupplies/materialsetting/supplier'} component={labourSuppliessupplierRoute}/>

        <Route path={rootPath + '/other/tyre/company'} component={tyreCompanyRoute} />
        <Route path={rootPath + '/other/tyre/alldepartment'} component={tyreAllDepartmentRoute} />
        <Route path={rootPath + '/other/tyre/units'} component={tyreUnitsRoute} />
        <Route path={rootPath + '/other/tyre/department'} component={tyreDepartmentRoute} />
        <Route path={rootPath + '/other/tyre/materialsetting/tyrecategory'} component={tyreCategoryRoute} />
        <Route path={rootPath + '/other/tyre/materialsetting/tyreCatalogue'} component={tyreInformationRoute} />
        <Route path={rootPath + '/other/tyre/materialsetting/tyreimport'} component={tyreImportRoute} />
        <Route path={rootPath + '/other/tyre/materialsetting/supplier'} component={tyreSupplierRoute}/>

        <Route path={rootPath + '/other/soft/company'} component={softCompanyRoute} />
        <Route path={rootPath + '/other/soft/alldepartment'} component={softAllDepartmentRoute} />
        <Route path={rootPath + '/other/soft/units'} component={softUnitsRoute} />
        <Route path={rootPath + '/other/soft/department'} component={softDepartmentRoute} />
        <Route path={rootPath + '/other/soft/materialsetting/softcategory'} component={softCategoryRoute} />
        <Route path={rootPath + '/other/soft/materialsetting/softCatalogue'} component={softInformationRoute} />
        <Route path={rootPath + '/other/soft/materialsetting/softimport'} component={softImportRoute} />
        <Route path={rootPath + '/other/soft/materialsetting/supplier'} component={softSupplierRoute}/>

        <Route path={rootPath + '/other/laboratorysupplies/company'} component={laboratorySuppliesCompanyRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/alldepartment'} component={laboratorySuppliesAllDepartmentRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/units'} component={laboratorySuppliesUnitsRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/department'} component={laboratorySuppliesDepartmentRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/materialsetting/laboratorysuppliescategory'} component={laboratorySuppliesCategoryRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/materialsetting/laboratorysuppliesCatalogue'} component={laboratorySuppliesInformationRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/materialsetting/laboratorysuppliesimport'} component={laboratorySuppliesImportRoute} />
        <Route path={rootPath + '/other/laboratorysupplies/materialsetting/supplier'} component={laboratorySuppliesSupplierRoute}/>

        <Route path={rootPath + '/purchase/itmaterial'} component={purchaseRoute} />
        <Route path={rootPath + '/purchase/unitsmaterial'} component={unitsMaterialPurchaseRoute} />
        <Route path={rootPath + '/purchase/itofficeequipment'} component={itOfficePurchaseRoute} />
        <Route path={rootPath + '/purchase/untilitofficeequipment'} component={unitsITOfficePurchaseRoute} />
        <Route path={rootPath + '/purchase/officesupplies'} component={officeSuppliesPurchaseRoute} />
        <Route path={rootPath + '/purchase/untilofficesupplies'} component={unitsOfficeSuppliesPurchaseRoute} />
        <Route path={rootPath + '/purchase/laboursupplies'} component={labourSuppliesPurchaseRoute} />
        <Route path={rootPath + '/purchase/untillaboursupplies'} component={unitsLabourSuppliesPurchaseRoute} />
        <Route path={rootPath + '/purchase/uninstallequipment'} component={uninstallEquipmentPurchaseRoute} />
        <Route path={rootPath + '/purchase/unitsuninstallequipment'} component={unitsUninstallEquipmentPurchaseRoute} />
        <Route exact path={rootPath + '/purchase/engineermaterial'}/>
        <Route path={rootPath + '/purchase/engineermaterial/engineermaterial'} component={engineerMaterialPurchaseRoute} />
        <Route path={rootPath + '/purchase/engineermaterial/hasnotpurchase'} component={hasNotPurchaseRoute} />
        <Route path={rootPath + '/purchase/engineermaterial/haspurchase'} component={hasPurchaseRoute} />
        <Route path={rootPath + '/purchase/tyre'} component={tyrePurchaseRoute} />
        <Route path={rootPath + '/purchase/unitstyre'} component={unitsTyrePurchaseRoute} />
        <Route path={rootPath + '/purchase/soft'} component={softPurchaseRoute} />
        <Route path={rootPath + '/purchase/unitssoft'} component={unitsSoftPurchaseRoute} />
        <Route path={rootPath + '/purchase/laboratorysupplies'} component={laboratorySuppliesPurchaseRoute} />
        <Route path={rootPath + '/purchase/unitslaboratorysupplies'} component={unitsLaboratorySuppliesPurchaseRoute} />

        <Route path={rootPath + '/purchase/materialsetting/supplier'} component={supplierRoute} />

        <Route path={rootPath + '/draw'} component={drawRoute} />

        <Route path={rootPath + '/stopproductionmaterial'} component={stopProductionMaterialRoute}/>

        <Route path={rootPath + '/statistic'} component={statisticRoute}/>
        <Route path={rootPath + '/statisticdraw'} component={statisticDrawRoute}/>

      </Switch>
    </Layout>
  )
}

mainRoute.propTypes = {
  match: PropTypes.object
}

export default mainRoute;
