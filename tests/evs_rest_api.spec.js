const { expect, test } = require('@playwright/test')

test.use({ actionTimeout: 60000 })

// test swagger landing page
test('api swagger landing page', async ({ page }) => {
  const response = await page.goto('https://api-evsrest.nci.nih.gov/swagger-ui/index.html#/');

  // Test that the response did not fail
  expect(response.status()).toBeLessThan(400);
  
  });      

  

//go to api and see if the concept C3224 is in the hierarchy
test('api concept C3224 summary', async ({ request }) => {
      
      const response = await request.get(`https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/C3224?include=summary`);
 
      expect(response.ok()).toBeTruthy;

      expect(response.status()).toBe(200);

      const responseBody = JSON.parse(await response.body());
      //console.log(responseBody);

      expect(responseBody.code).toBe('C3224');
      expect(responseBody.name).toBe('Melanoma');

      expect(responseBody.synonyms).toBeDefined();
      expect(responseBody.synonyms.length).toBeGreaterThan(0);
      expect(responseBody.definitions).toBeDefined();
      expect(responseBody.definitions.length).toBeGreaterThan(0);
      expect(responseBody.properties).toBeDefined();
      expect(responseBody.properties.length).toBeGreaterThan(0);

      expect(responseBody.synonyms.find(s => s.name === 'Melanoma')).toBeDefined();
      expect(responseBody.synonyms.find(s => s.name === 'Melanoma' 
                                          && s.source ==='NCI' 
                                          && s.termType === 'PT')).toBeDefined();


});
/**
 * 	  FULL EXPECTED OUTPUT

code	"C3224"
name	"Melanoma"
terminology	"ncit"
version	"23.03d"
leaf	false
synonyms	
0	
name	"Melanoma"
termType	"SY"
type	"FULL_SYN"
source	"caDSR"
1	
name	"Malignant Melanoma"
termType	"SY"
type	"FULL_SYN"
source	"CDISC"
2	
name	"MELANOMA, MALIGNANT"
termType	"PT"
type	"FULL_SYN"
source	"CDISC"
3	
name	"Melanoma"
termType	"PT"
type	"FULL_SYN"i
source	"Cellosaurus"
4	
name	"Malignant Melanoma"
termType	"PT"
type	"FULL_SYN"
source	"CPTAC"
5	
name	"Melanoma"
termType	"PT"
type	"FULL_SYN"
source	"CTEP"
code	"10053571"
subSource	"SDC"
6	
name	"Melanoma"
termType	"PT"
type	"FULL_SYN"
source	"CTRP"
7	
name	"Melanoma"
termType	"DN"
type	"FULL_SYN"
source	"CTRP"
8	
name	"Melanoma"
termType	"PT"
type	"FULL_SYN"
source	"GDC"
9	
name	"Melanoma, NOS"
termType	"SY"
type	"FULL_SYN"
source	"GDC"
10	
name	"melanoma"
termType	"PT"
type	"FULL_SYN"
source	"NCI-GLOSS"
code	"CDR0000045135"
11	
name	"Malignant Melanoma"
termType	"SY"
type	"FULL_SYN"
source	"NCI"
12	
name	"Melanoma"
termType	"PT"
type	"FULL_SYN"
source	"NCI"
13	
name	"Melanoma"
termType	"PT"
type	"FULL_SYN"
source	"NICHD"
14	
name	"Melanoma"
type	"Display_Name"
15	
name	"Melanoma"
type	"Preferred_Name"
definitions	
0	
definition	"A form of cancer that begins in melanocytes (cells that make the pigment melanin). It may begin in a mole (skin melanoma), but can also begin in other pigmented tissues, such as in the eye or in the intestines."
type	"ALT_DEFINITION"
source	"NCI-GLOSS"
1	
definition	"A malignant neoplasm composed of melanocytes."
type	"ALT_DEFINITION"
source	"CDISC"
2	
definition	"A malignant neoplasm comprised of melanocytes typically arising in the skin."
type	"ALT_DEFINITION"
source	"NICHD"
3	
definition	"A malignant, usually aggressive tumor composed of atypical, neoplastic melanocytes. Most often, melanomas arise in the skin (cutaneous melanomas) and include the following histologic subtypes: superficial spreading melanoma, nodular melanoma, acral lentiginous melanoma, and lentigo maligna melanoma. Cutaneous melanomas may arise from acquired or congenital melanocytic or dysplastic nevi. Melanomas may also arise in other anatomic sites including the gastrointestinal system, eye, urinary tract, and reproductive system. Melanomas frequently metastasize to lymph nodes, liver, lungs, and brain."
type	"DEFINITION"
source	"NCI"
properties	
0	
type	"Contributing_Source"
value	"CDISC"
1	
type	"Contributing_Source"
value	"Cellosaurus"
2	
type	"Contributing_Source"
value	"CPTAC"
3	
type	"Contributing_Source"
value	"CTEP"
4	
type	"Contributing_Source"
value	"CTRP"
5	
type	"Contributing_Source"
value	"GDC"
6	
type	"Contributing_Source"
value	"MedDRA"
7	
type	"Contributing_Source"
value	"NICHD"
8	
type	"ICD-O-3_Code"
value	"8720/3"
9	
type	"Legacy Concept Name"
value	"Melanoma"
10	
type	"Maps_To"
value	"8720/3"
11	
type	"Maps_To"
value	"Malignant melanoma, NOS"
12	
type	"Maps_To"
value	"Melanoma"
13	
type	"Maps_To"
value	"Melanoma, NOS"
14	
type	"Neoplastic_Status"
value	"Malignant"
15	
type	"Semantic_Type"
value	"Neoplastic Process"
16	
type	"UMLS_CUI"
value	"C0025202"
 */


//'go to api and see if the concept is in the hierarchy'
test('api ncit metadata properties', async ({ request }) => {
      
  const response = await request.get(`https://api-evsrest.nci.nih.gov/api/v1/metadata/ncit/properties?include=minimal`);

  expect(response.ok()).toBeTruthy;

  expect(response.status()).toBe(200);

  // parse the body into JSON for easy testing
  const responseBody = JSON.parse(await response.body());

  //
  const anything1 = responseBody.find(x => x.code === 'P106');  
  expect(anything1).toBeDefined();
  expect(anything1.code).toBe('P106');
  expect(anything1.name).toBe('Semantic_Type');
  expect(anything1.terminology).toBe('ncit');
  expect(anything1.version).toBeDefined();

  //
  const anything2 = responseBody.find(x => x.code === 'P207');  
  expect(anything2).toBeDefined();
  expect(anything2.code).toBe('P207');
  expect(anything2.name).toBe('UMLS_CUI');
  expect(anything2.terminology).toBe('ncit');
  expect(anything2.version).toBeDefined();

  //
  const anything3 = responseBody.find(x => x.code === 'P211');  
  expect(anything3).toBeDefined();
  expect(anything3.code).toBe('P211');
  expect(anything3.name).toBe('GO_Annotation');
  expect(anything3.terminology).toBe('ncit');
  expect(anything3.version).toBeDefined();
  
});

/*   FULL EXPECTED OUTPUT
  [{"code":"P106","name":"Semantic_Type","terminology":"ncit","version":"23.04d"},{"code":"P207","name":"UMLS_CUI","terminology":"ncit","version":"23.04d"},{"code":"P366","name":"Legacy Concept Name","terminology":"ncit","version":"23.04d"},{"code":"P322","name":"Contributing_Source","terminology":"ncit","version":"23.04d"},{"code":"P208","name":"NCI_META_CUI","terminology":"ncit","version":"23.04d"},{"code":"P98","name":"DesignNote","terminology":"ncit","version":"23.04d"},{"code":"P375","name":"Maps_To","terminology":"ncit","version":"23.04d"},{"code":"oboInOwl:hasDbXref","name":"xRef","terminology":"ncit","version":"23.04d"},{"code":"P92","name":"Subsource","terminology":"ncit","version":"23.04d"},{"code":"P319","name":"FDA_UNII_Code","terminology":"ncit","version":"23.04d"},{"code":"P210","name":"CAS_Registry","terminology":"ncit","version":"23.04d"},{"code":"P310","name":"Concept_Status","terminology":"ncit","version":"23.04d"},{"code":"P175","name":"NSC Number","terminology":"ncit","version":"23.04d"},{"code":"P302","name":"Accepted_Therapeutic_Use_For","terminology":"ncit","version":"23.04d"},{"code":"P329","name":"PDQ_Open_Trial_Search_ID","terminology":"ncit","version":"23.04d"},{"code":"P330","name":"PDQ_Closed_Trial_Search_ID","terminology":"ncit","version":"23.04d"},{"code":"P350","name":"Chemical_Formula","terminology":"ncit","version":"23.04d"},{"code":"P368","name":"CHEBI_ID","terminology":"ncit","version":"23.04d"},{"code":"P399","name":"NCI_Drug_Dictionary_ID","terminology":"ncit","version":"23.04d"},{"code":"P361","name":"Extensible_List","terminology":"ncit","version":"23.04d"},{"code":"P372","name":"Publish_Value_Set","terminology":"ncit","version":"23.04d"},{"code":"P376","name":"Term_Browser_Value_Set_Description","terminology":"ncit","version":"23.04d"},{"code":"P398","name":"Value_Set_Pair","terminology":"ncit","version":"23.04d"},{"code":"P317","name":"FDA_Table","terminology":"ncit","version":"23.04d"},{"code":"P363","name":"Neoplastic_Status","terminology":"ncit","version":"23.04d"},{"code":"P334","name":"ICD-O-3_Code","terminology":"ncit","version":"23.04d"},{"code":"P320","name":"OID","terminology":"ncit","version":"23.04d"},{"code":"P171","name":"PubMedID_Primary_Reference","terminology":"ncit","version":"23.04d"},{"code":"P200","name":"OLD_PARENT","terminology":"ncit","version":"23.04d"},{"code":"P333","name":"Use_For","terminology":"ncit","version":"23.04d"},{"code":"P100","name":"OMIM_Number","terminology":"ncit","version":"23.04d"},{"code":"P93","name":"Swiss_Prot","terminology":"ncit","version":"23.04d"},{"code":"P96","name":"Gene_Encodes_Product","terminology":"ncit","version":"23.04d"},{"code":"P369","name":"HGNC_ID","terminology":"ncit","version":"23.04d"},{"code":"P351","name":"US_Recommended_Intake","terminology":"ncit","version":"23.04d"},{"code":"P352","name":"Tolerable_Level","terminology":"ncit","version":"23.04d"},{"code":"P353","name":"INFOODS","terminology":"ncit","version":"23.04d"},{"code":"P354","name":"USDA_ID","terminology":"ncit","version":"23.04d"},{"code":"P355","name":"Unit","terminology":"ncit","version":"23.04d"},{"code":"P364","name":"OLD_ASSOCIATION","terminology":"ncit","version":"23.04d"},{"code":"P102","name":"GenBank_Accession_Number","terminology":"ncit","version":"23.04d"},{"code":"P204","name":"OLD_ROLE","terminology":"ncit","version":"23.04d"},{"code":"P321","name":"EntrezGene_ID","terminology":"ncit","version":"23.04d"},{"code":"P367","name":"PID_ID","terminology":"ncit","version":"23.04d"},{"code":"P331","name":"NCBI_Taxon_ID","terminology":"ncit","version":"23.04d"},{"code":"P216","name":"BioCarta_ID","terminology":"ncit","version":"23.04d"},{"code":"P215","name":"KEGG_ID","terminology":"ncit","version":"23.04d"},{"code":"P362","name":"miRBase_ID","terminology":"ncit","version":"23.04d"},{"code":"P201","name":"OLD_CHILD","terminology":"ncit","version":"23.04d"},{"code":"P315","name":"SNP_ID","terminology":"ncit","version":"23.04d"},{"code":"P400","name":"ClinVar_Variation_ID","terminology":"ncit","version":"23.04d"},{"code":"P358","name":"Nutrient","terminology":"ncit","version":"23.04d"},{"code":"P359","name":"Micronutrient","terminology":"ncit","version":"23.04d"},{"code":"P203","name":"OLD_KIND","terminology":"ncit","version":"23.04d"},{"code":"P360","name":"Macronutrient","terminology":"ncit","version":"23.04d"},{"code":"P371","name":"NICHD_Hierarchy_Term","terminology":"ncit","version":"23.04d"},{"code":"P357","name":"Essential_Fatty_Acid","terminology":"ncit","version":"23.04d"},{"code":"P332","name":"MGI_Accession_ID","terminology":"ncit","version":"23.04d"},{"code":"P101","name":"Homologous_Gene","terminology":"ncit","version":"23.04d"},{"code":"P211","name":"GO_Annotation","terminology":"ncit","version":"23.04d"},{"code":"P356","name":"Essential_Amino_Acid","terminology":"ncit","version":"23.04d"},{"code":"P167","name":"Image_Link","terminology":"ncit","version":"23.04d"},{"code":"P316","name":"Relative_Enzyme_Activity","terminology":"ncit","version":"23.04d"}]
*/


//test('go to api and see if the concept is in the hierarchy', async ({ request, baseURL }) => {
  test('api search for bone', async ({ request }) => {
      
    const response = await request.get(`https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?fromRecord=0&include=minimal&pageSize=10&term=bone%20cancer&type=contains`);
  
    expect(response.ok()).toBeTruthy;
  
    expect(response.status()).toBe(200);
  
    // parse the body into JSON for easy testing
    const responseBody = JSON.parse(await response.body());
  
    //
    expect(responseBody.total).toBeDefined();
    //expect(responseBody.total.length).toBeGreaterThan(0);

    expect(responseBody.parameters).toBeDefined();
    expect(responseBody.parameters.term).toBe('bone cancer');
    expect(responseBody.parameters.type).toBe('contains');
    expect(responseBody.parameters.include).toBe('minimal');
    
    expect(responseBody.concepts).toBeDefined();
    expect(responseBody.concepts.length).toBeGreaterThan(0);
    
    const someconcept1 = responseBody.concepts.find(x => x.code === 'C4016');
    expect(someconcept1).toBeDefined();
    expect(someconcept1.code).toBe('C4016');
    expect(someconcept1.name).toBe('Malignant Bone Neoplasm');
    expect(someconcept1.terminology).toBe('ncit');

    const someconcept2 = responseBody.concepts.find(x => x.code === 'C35501');
    expect(someconcept2).toBeDefined();
    expect(someconcept2.code).toBe('C35501');
    expect(someconcept2.name).toBe('Malignant Bone Marrow Neoplasm');
    expect(someconcept2.terminology).toBe('ncit');

  });

  /*
  FULL EXPECTED OUTPUT
  {"total":16115,"timeTaken":39,"parameters":{"term":"bone cancer","type":"contains","include":"minimal","fromRecord":0,"pageSize":10,"terminology":["ncit"]},"concepts":[{"code":"C4016","name":"Malignant Bone Neoplasm","terminology":"ncit","version":"23.04d","leaf":false},{"code":"C136561","name":"Bone Cancer TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":false},{"code":"C88422","name":"Bone Cancer TNM Finding v7","terminology":"ncit","version":"23.04d","leaf":false},{"code":"C35501","name":"Malignant Bone Marrow Neoplasm","terminology":"ncit","version":"23.04d","leaf":false},{"code":"C136562","name":"Bone Cancer Clinical TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":false},{"code":"C136564","name":"Bone Cancer cM0 TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":true},{"code":"C136565","name":"Bone Cancer cM1 TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":false},{"code":"C136566","name":"Bone Cancer cM1a TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":true},{"code":"C136568","name":"Bone Cancer cM1b TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":true},{"code":"C136569","name":"Bone Cancer Pathologic TNM Finding v8","terminology":"ncit","version":"23.04d","leaf":false}]}
  */