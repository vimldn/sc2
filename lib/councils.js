// UK Council data with catchment API endpoints
// Councils are organized by data availability

export const councilsWithAPIs = {
  // SCOTLAND - All have data via national portal or individual APIs
  'Aberdeen City': {
    country: 'Scotland',
    hasData: true,
    apiType: 'arcgis',
    endpoints: {
      primary: 'https://services5.arcgis.com/0sktPVp3t1LvXc9z/arcgis/rest/services/Primary_School_Catchments/FeatureServer/0',
      secondary: 'https://services5.arcgis.com/0sktPVp3t1LvXc9z/arcgis/rest/services/Secondary_School_Catchments/FeatureServer/0',
    },
    fallbackUrl: 'https://www.aberdeencity.gov.uk/services/education-and-childcare/school-catchment-areas',
  },
  'City of Edinburgh': {
    country: 'Scotland',
    hasData: true,
    apiType: 'arcgis',
    endpoints: {
      primary: null, // Would need to fetch from edinburgh portal
      secondary: null,
    },
    fallbackUrl: 'https://www.edinburgh.gov.uk/catchmentmap',
  },
  'Glasgow City': {
    country: 'Scotland',
    hasData: true,
    apiType: 'arcgis-webapp',
    fallbackUrl: 'https://glasgowgis.maps.arcgis.com/apps/webappviewer/index.html?id=3296a79016c34af98c4e71c0f1e02fa5',
  },
  'Fife': {
    country: 'Scotland',
    hasData: true,
    apiType: 'download',
    fallbackUrl: 'https://www.fife.gov.uk/kb/docs/articles/education2/school-information/find-your-catchment-school',
  },
  
  // ENGLAND - Councils with working APIs
  'York': {
    country: 'England',
    hasData: true,
    apiType: 'arcgis',
    endpoints: {
      primary: 'https://maps.york.gov.uk/arcgis/rest/services/Public/EducationLearning/MapServer/3',
      secondary: 'https://maps.york.gov.uk/arcgis/rest/services/Public/EducationLearning/MapServer/4',
    },
    fallbackUrl: 'https://www.york.gov.uk/SchoolCatchments',
  },
  'Wokingham': {
    country: 'England',
    hasData: true,
    apiType: 'arcgis',
    endpoints: {
      primary: 'https://maps.wokingham.gov.uk/arcgis/rest/services/Web/SchoolCatchment/FeatureServer/1',
      secondary: 'https://maps.wokingham.gov.uk/arcgis/rest/services/Web/SchoolCatchment/FeatureServer/2',
    },
    fallbackUrl: 'https://www.wokingham.gov.uk/schools-and-education/school-information-and-services/school-catchment-areas',
  },
  'Sheffield': {
    country: 'England',
    hasData: true,
    apiType: 'arcgis-hub',
    fallbackUrl: 'https://sheffield-city-council-open-data-sheffieldcc.hub.arcgis.com',
  },
  'Nottingham': {
    country: 'England',
    hasData: true,
    apiType: 'arcgis-hub',
    fallbackUrl: 'https://geoportal-nottmcitycouncil.opendata.arcgis.com',
  },
  'Wiltshire': {
    country: 'England',
    hasData: true,
    apiType: 'arcgis-hub',
    fallbackUrl: 'https://wiltshire-council-open-data-hub-wiltscouncil.hub.arcgis.com',
  },
  'Hampshire': {
    country: 'England',
    hasData: true,
    apiType: 'interactive',
    fallbackUrl: 'https://maps.hants.gov.uk/SchoolCatchmentAreaFinder/',
  },
  'Gateshead': {
    country: 'England',
    hasData: true,
    apiType: 'download',
    fallbackUrl: 'https://www.gateshead.gov.uk/article/2998/School-catchment-areas',
  },
};

// Mapping of postcode areas to local authorities
// This is a simplified mapping - in production you'd use a full postcode lookup
export const postcodeToCouncil = {
  // Scotland
  'AB': 'Aberdeen City',
  'DD': 'Dundee City',
  'EH': 'City of Edinburgh',
  'FK': 'Falkirk',
  'G': 'Glasgow City',
  'KY': 'Fife',
  'ML': 'North Lanarkshire',
  'PA': 'Renfrewshire',
  'PH': 'Perth & Kinross',
  'TD': 'Scottish Borders',
  'KA': 'North Ayrshire',
  
  // England - Selected
  'YO': 'York',
  'RG': 'Wokingham', // Partial - also Reading, West Berkshire
  'S': 'Sheffield',
  'NG': 'Nottingham',
  'SN': 'Wiltshire',
  'BA': 'Wiltshire', // Partial
  'SP': 'Wiltshire', // Partial
  'SO': 'Hampshire',
  'PO': 'Hampshire', // Partial - also Portsmouth
  'GU': 'Hampshire', // Partial - also Surrey
  'NE': 'Gateshead', // Partial - also Newcastle
  
  // London Boroughs
  'E': 'Tower Hamlets/Hackney/Newham',
  'N': 'Various London Boroughs',
  'NW': 'Various London Boroughs',
  'SE': 'Various London Boroughs',
  'SW': 'Various London Boroughs',
  'W': 'Various London Boroughs',
  'WC': 'Camden/Westminster',
  'EC': 'City of London/Islington',
  
  // Major cities
  'B': 'Birmingham',
  'M': 'Manchester',
  'L': 'Liverpool',
  'LS': 'Leeds',
  'BD': 'Bradford',
  'BS': 'Bristol',
  'CF': 'Cardiff',
  'BN': 'Brighton & Hove',
  'OX': 'Oxfordshire',
  'CB': 'Cambridgeshire',
};

// Full list of council catchment checker URLs for fallback
export const councilCatchmentUrls = {
  // Scotland (comprehensive)
  'Aberdeen City': 'https://www.aberdeencity.gov.uk/services/education-and-childcare/school-catchment-areas',
  'Aberdeenshire': 'https://www.aberdeenshire.gov.uk/schools/school-info/school-catchments/',
  'Angus': 'https://www.angus.gov.uk/schools_and_young_people/schools/find_your_catchment_school',
  'Argyll & Bute': 'https://www.argyll-bute.gov.uk/education-and-learning/schools/school-catchment-areas',
  'City of Edinburgh': 'https://www.edinburgh.gov.uk/catchmentmap',
  'Clackmannanshire': 'https://www.clacks.gov.uk/education/schoolcatchmentareas/',
  'Dumfries & Galloway': 'https://www.dumgal.gov.uk/article/15242/School-catchment-areas',
  'Dundee City': 'https://www.dundeecity.gov.uk/service-area/children-and-families-service/education/find-my-school',
  'East Ayrshire': 'https://www.east-ayrshire.gov.uk/EducationAndLearning/Schools/Enrolment/SchoolCatchmentAreas.aspx',
  'East Dunbartonshire': 'https://www.eastdunbarton.gov.uk/residents/schools-and-learning/school-catchment-areas',
  'East Lothian': 'https://www.eastlothian.gov.uk/info/210557/schools_and_learning/11899/school_catchment_areas',
  'East Renfrewshire': 'https://www.eastrenfrewshire.gov.uk/catchment-areas',
  'Falkirk': 'https://www.falkirk.gov.uk/services/schools-education/school-life/catchment-areas.aspx',
  'Fife': 'https://www.fife.gov.uk/kb/docs/articles/education2/school-information/find-your-catchment-school',
  'Glasgow City': 'https://www.glasgow.gov.uk/index.aspx?articleid=17885',
  'Highland': 'https://www.highland.gov.uk/info/878/schools/11/school_catchment_areas',
  'Inverclyde': 'https://www.inverclyde.gov.uk/education-and-learning/schools/school-catchment-areas',
  'Midlothian': 'https://www.midlothian.gov.uk/info/200189/school_places_and_டtransport/268/school_catchment_areas',
  'Moray': 'https://www.moray.gov.uk/moray_standard/page_55469.html',
  'North Ayrshire': 'https://www.north-ayrshire.gov.uk/education-and-learning/schools/school-catchment-areas.aspx',
  'North Lanarkshire': 'https://www.northlanarkshire.gov.uk/schools-and-education/school-catchment-areas',
  'Orkney': 'https://www.orkney.gov.uk/Service-Directory/E/school-catchment-areas.htm',
  'Perth & Kinross': 'https://www.pkc.gov.uk/article/17308/School-catchment-areas',
  'Renfrewshire': 'https://www.renfrewshire.gov.uk/article/2165/School-catchment-areas',
  'Scottish Borders': 'https://www.scotborders.gov.uk/info/20009/schools_and_learning/597/school_catchment_areas',
  'Shetland': 'https://www.shetland.gov.uk/schools/school-catchment-areas',
  'South Ayrshire': 'https://www.south-ayrshire.gov.uk/education/catchment-areas.aspx',
  'South Lanarkshire': 'https://www.southlanarkshire.gov.uk/info/200186/primary_school_information/39/catchment_areas',
  'Stirling': 'https://www.stirling.gov.uk/schools-education/school-catchment-areas/',
  'West Dunbartonshire': 'https://www.west-dunbarton.gov.uk/schools-and-learning/schools/choosing-a-school/catchment-areas/',
  'West Lothian': 'https://www.westlothian.gov.uk/article/33038/School-catchment-areas',
  
  // England (major councils)
  'Birmingham': 'https://www.birmingham.gov.uk/info/20119/school_admissions/1778/catchment_areas',
  'Bradford': 'https://www.bradford.gov.uk/education-and-skills/school-admissions/catchment-areas/',
  'Brighton & Hove': 'https://www.brighton-hove.gov.uk/children-and-learning/schools/school-catchment-areas',
  'Bristol': 'https://www.bristol.gov.uk/schools-learning-early-years/school-catchment-areas',
  'Buckinghamshire': 'https://www.buckinghamshire.gov.uk/schools-and-learning/schools-index/apply-for-a-school-place/catchment-areas/',
  'Cambridgeshire': 'https://www.cambridgeshire.gov.uk/residents/children-and-families/schools-learning/school-admissions/catchment-areas',
  'Cornwall': 'https://www.cornwall.gov.uk/schools-and-education/schools-and-colleges/school-admissions/catchment-areas/',
  'County Durham': 'https://www.durham.gov.uk/schooladmissions',
  'Cumbria': 'https://www.cumbria.gov.uk/childrensservices/schoolsandlearning/lss/schooladmissions.asp',
  'Derbyshire': 'https://www.derbyshire.gov.uk/education/schools/school-places/catchment-areas/catchment-areas.aspx',
  'Devon': 'https://www.devon.gov.uk/educationandfamilies/school-information/apply-for-a-school-place/catchment-areas',
  'Dorset': 'https://www.dorsetcouncil.gov.uk/education-and-training/schools-and-learning/apply-for-a-school-place/catchment-areas.aspx',
  'East Riding': 'https://www.eastriding.gov.uk/learning/schools-colleges-and-academies/school-admissions/school-catchment-areas/',
  'East Sussex': 'https://www.eastsussex.gov.uk/education-and-learning/schools/admissions/catchment-areas',
  'Essex': 'https://www.essex.gov.uk/apply-for-a-school-place',
  'Gloucestershire': 'https://www.gloucestershire.gov.uk/education-and-learning/find-a-school/',
  'Hampshire': 'https://maps.hants.gov.uk/SchoolCatchmentAreaFinder/',
  'Herefordshire': 'https://www.herefordshire.gov.uk/schools-education/school-catchment-areas',
  'Hertfordshire': 'https://www.hertfordshire.gov.uk/services/schools-and-education/school-admissions/catchment-areas.aspx',
  'Kent': 'https://www.kent.gov.uk/education-and-children/schools/school-places/catchment-areas',
  'Lancashire': 'https://www.lancashire.gov.uk/children-education-families/schools/applying-for-a-school-place/',
  'Leeds': 'https://www.leeds.gov.uk/schools-and-education/apply-for-a-school-place/catchment-areas',
  'Leicester': 'https://www.leicester.gov.uk/schools-and-learning/school-admissions/catchment-areas/',
  'Leicestershire': 'https://www.leicestershire.gov.uk/education-and-children/schools-colleges-and-academies/school-admissions/catchment-areas',
  'Lincolnshire': 'https://www.lincolnshire.gov.uk/school-admissions/catchment-areas',
  'Liverpool': 'https://liverpool.gov.uk/schools-and-learning/school-admissions/catchment-areas/',
  'Manchester': 'https://www.manchester.gov.uk/info/500321/primary_school_admissions/6899/catchment_areas',
  'Norfolk': 'https://www.norfolk.gov.uk/education-and-learning/schools/school-admissions/catchment-areas',
  'North Somerset': 'https://n-somerset.gov.uk/my-services/schools-learning/school-admissions/secondary-school-catchment-areas',
  'North Yorkshire': 'https://www.northyorks.gov.uk/education-and-learning/school-admissions/apply-school-place/catchment-areas',
  'Northamptonshire': 'https://www.northamptonshire.gov.uk/councilservices/children-families-education/schools-and-education/school-admissions/Pages/catchment-areas.aspx',
  'Nottingham': 'https://www.nottinghamcity.gov.uk/information-for-residents/education-and-schools/school-admissions/catchment-areas/',
  'Nottinghamshire': 'https://www.nottinghamshire.gov.uk/education/school-admissions/school-catchment-areas',
  'Oxfordshire': 'https://www.oxfordshire.gov.uk/residents/schools/apply-school-place/catchment-areas',
  'Sheffield': 'https://www.sheffield.gov.uk/schools-childcare/school-admissions/school-catchment-areas',
  'Somerset': 'https://www.somerset.gov.uk/education-and-families/school-admissions/',
  'South Gloucestershire': 'https://www.southglos.gov.uk/education-and-learning/schools/school-admissions/catchment-areas/',
  'Staffordshire': 'https://www.staffordshire.gov.uk/Education/Schoolsandcolleges/Admissions/Catchment-areas.aspx',
  'Stockport': 'https://www.stockport.gov.uk/find-your-catchment-area',
  'Suffolk': 'https://www.suffolk.gov.uk/children-families-and-learning/schools/school-places/catchment-areas',
  'Surrey': 'https://www.surreycc.gov.uk/schools-and-learning/schools/admissions/catchment-areas',
  'Trafford': 'https://www.trafford.gov.uk/residents/schools/school-admissions/Catchment-areas.aspx',
  'Warwickshire': 'https://www.warwickshire.gov.uk/applying-school-place/catchment-areas',
  'West Berkshire': 'https://www.westberks.gov.uk/school-catchment-areas',
  'West Sussex': 'https://www.westsussex.gov.uk/education-children-and-families/schools-and-colleges/school-places/catchment-areas/',
  'Wiltshire': 'https://www.wiltshire.gov.uk/schools-learning-admissions-catchment',
  'Wokingham': 'https://www.wokingham.gov.uk/schools-and-education/school-information-and-services/school-catchment-areas',
  'Worcestershire': 'https://www.worcestershire.gov.uk/info/20632/apply_for_a_school_place/1609/catchment_areas',
  'York': 'https://www.york.gov.uk/SchoolCatchments',
  
  // London Boroughs
  'Barking & Dagenham': 'https://www.lbbd.gov.uk/catchment-areas',
  'Barnet': 'https://www.barnet.gov.uk/schools-and-education/school-admissions/catchment-areas',
  'Bexley': 'https://www.bexley.gov.uk/services/schools-and-education/school-admissions/catchment-areas',
  'Brent': 'https://www.brent.gov.uk/services-for-residents/education-and-schools/school-admissions/',
  'Bromley': 'https://www.bromley.gov.uk/school-admissions/catchment-areas',
  'Camden': 'https://www.camden.gov.uk/catchment-areas',
  'Croydon': 'https://www.croydon.gov.uk/schools-and-education/schools/catchment-areas',
  'Ealing': 'https://www.ealing.gov.uk/info/201041/school_admissions/2203/catchment_areas',
  'Enfield': 'https://new.enfield.gov.uk/services/children-and-education/school-admissions/catchment-areas/',
  'Greenwich': 'https://www.royalgreenwich.gov.uk/info/200286/school_admissions/1859/catchment_areas',
  'Hackney': 'https://education.hackney.gov.uk/content/catchment-areas',
  'Hammersmith & Fulham': 'https://www.lbhf.gov.uk/children-and-young-people/schools-and-colleges/school-admissions/catchment-areas',
  'Haringey': 'https://www.haringey.gov.uk/children-and-families/schools-and-education/school-admissions/catchment-areas',
  'Harrow': 'https://www.harrow.gov.uk/schools-learning/catchment-areas',
  'Havering': 'https://www.havering.gov.uk/info/20004/schools_and_education/652/school_catchment_areas',
  'Hillingdon': 'https://www.hillingdon.gov.uk/catchment',
  'Hounslow': 'https://www.hounslow.gov.uk/info/20032/school_admissions/1951/catchment_areas',
  'Islington': 'https://www.islington.gov.uk/children-and-families/schools/apply-for-a-school-place/catchment-areas',
  'Kensington & Chelsea': 'https://www.rbkc.gov.uk/schools-and-education/school-admissions/catchment-areas',
  'Kingston': 'https://www.kingston.gov.uk/info/200289/school_admissions/1131/catchment_areas',
  'Lambeth': 'https://www.lambeth.gov.uk/schools-and-education/school-admissions/catchment-areas',
  'Lewisham': 'https://lewisham.gov.uk/myservices/education/schools/school-admission/catchment-areas',
  'Merton': 'https://www.merton.gov.uk/education-and-learning/schools/school-admissions/catchment-areas',
  'Newham': 'https://www.newham.gov.uk/schools-education/school-catchment-areas',
  'Redbridge': 'https://www.redbridge.gov.uk/schools/school-admissions/catchment-areas/',
  'Richmond': 'https://www.richmond.gov.uk/services/schools_and_education/school_admissions/school_catchment_areas',
  'Southwark': 'https://www.southwark.gov.uk/schools-and-education/school-admissions/catchment-areas',
  'Sutton': 'https://www.sutton.gov.uk/info/200439/school_admissions/1384/catchment_areas',
  'Tower Hamlets': 'https://www.towerhamlets.gov.uk/lgnl/education_and_learning/schools/school_admissions/catchment_areas.aspx',
  'Waltham Forest': 'https://www.walthamforest.gov.uk/content/catchment-areas',
  'Wandsworth': 'https://www.wandsworth.gov.uk/schools-and-education/school-admissions/catchment-areas/',
  'Westminster': 'https://www.westminster.gov.uk/schools-and-education/school-admissions/catchment-areas',
};

export default councilCatchmentUrls;
