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

// DESC go to api and see if the concept is in the hierarchy
//      note: if there are a lot of concepts, then you may
//      need to be aware of the pagination issue.
//      changed original query from 'Bone Cancer' to 'glioma'
  test('api search for glioma', async ({ request }) => {
      
    const response = await request.get(`https://api-evsrest.nci.nih.gov/api/v1/concept/ncit/search?fromRecord=0&include=minimal&pageSize=100&term=glioma&type=contains`);
  
    expect(response.ok()).toBeTruthy;
  
    expect(response.status()).toBe(200);
  
    // parse the body into JSON for easy testing
    const responseBody = JSON.parse(await response.body());
  
    //
    expect(responseBody.total).toBeDefined();
    //expect(responseBody.total.length).toBeGreaterThan(0);

    expect(responseBody.parameters).toBeDefined();
    expect(responseBody.parameters.term).toBe('glioma');
    expect(responseBody.parameters.type).toBe('contains');
    expect(responseBody.parameters.include).toBe('minimal');
    
    expect(responseBody.concepts).toBeDefined();
    expect(responseBody.concepts.length).toBeGreaterThan(0);
    
    const someconcept1 = responseBody.concepts.find(x => x.code === 'C3059');
    expect(someconcept1).toBeDefined();
    expect(someconcept1.code).toBe('C3059');
    expect(someconcept1.name).toBe('Glioma');
    expect(someconcept1.terminology).toBe('ncit');

    const someconcept2 = responseBody.concepts.find(x => x.code === 'C4822');
    expect(someconcept2).toBeDefined();
    expect(someconcept2.code).toBe('C4822');
    expect(someconcept2.name).toBe('Malignant Glioma');
    expect(someconcept2.terminology).toBe('ncit');

  });

  /*
  FULL EXPECTED OUTPUT
{"total":279,"timeTaken":55,"parameters":{"term":"glioma","type":"contains","include":"minimal","fromRecord":0,"pageSize":1000,"terminology":["ncit"]},"concepts":[{"code":"C3059","name":"Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C91479","name":"Glioblastoma Multiforme Pathway","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C4822","name":"Malignant Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C3903","name":"Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C129325","name":"Diffuse Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C132506","name":"Recurrent Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C147107","name":"Refractory Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C168573","name":"Resectable Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C176889","name":"Unresectable Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C180407","name":"Tectal Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C180877","name":"Metastatic Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C129781","name":"Glioma-Associated Antigen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C129297","name":"Canine Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C5592","name":"Chordoid Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C92552","name":"Angiocentric Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C8501","name":"Brain Stem Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C64069","name":"Rat Malignant Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C115195","name":"Childhood Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C115250","name":"Adult Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C173846","name":"Bilateral Thalamic Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C19669","name":"Glioma Marker Network","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C127816","name":"WHO Grade 3 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C4537","name":"Optic Nerve Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C8567","name":"Visual Pathway Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C132067","name":"Low Grade Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C142848","name":"Recurrent Malignant Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C142855","name":"Refractory Malignant Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C162993","name":"Malignant Brain Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C180408","name":"Recurrent Tectal Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C180876","name":"Locally Advanced Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C182151","name":"Diffuse Midline Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C4534","name":"Spinal Cord Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C7535","name":"Childhood Visual Pathway Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C9091","name":"Adult Brain Stem Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C60348","name":"Rat Benign Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C60454","name":"Rat Malignant Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C132505","name":"WHO Grade 2 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C7446","name":"Anaplastic Brain Stem Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C9042","name":"Childhood Brain Stem Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C157865","name":"Glioma, Glioblastoma & Astrocytoma Surgery","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C105810","name":"Autologous Glioma Cell Lysate","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C155829","name":"Unresectable Low Grade Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C155983","name":"Recurrent Visual Pathway Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C155984","name":"Refractory Visual Pathway Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C177793","name":"Refractory Low Grade Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C177794","name":"Recurrent Low Grade Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C177797","name":"WHO Grade 1 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C178558","name":"Metastatic Low Grade Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C185471","name":"Infant-Type Hemispheric Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C2055","name":"Allogenic Glioma Cancer Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C94764","name":"Diffuse Intrinsic Pontine Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C126026","name":"Macdonald Glioma 1990 Oncology Response Criteria","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C114760","name":"Childhood Brain Stem Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C115923","name":"Untreated Childhood Brain Stem Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C115957","name":"Untreated Childhood Visual Pathway Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C148037","name":"Recurrent WHO Grade 2 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C148038","name":"Recurrent WHO Grade 3 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C7529","name":"Recurrent Childhood Visual Pathway Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C7531","name":"Recurrent Childhood Optic Nerve Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C9190","name":"Recurrent Childhood Brain Stem Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C9371","name":"Adult Brain Stem Mixed Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C139000","name":"Glioma Lysate Vaccine GBM6-AD","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C136518","name":"Recurrent Diffuse Intrinsic Pontine Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C136519","name":"Refractory Diffuse Intrinsic Pontine Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C153865","name":"Refractory WHO Grade 3 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C158104","name":"Refractory WHO Grade 2 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C166372","name":"Canine Glioma Project Property Terminology","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C177796","name":"Recurrent WHO Grade 1 Glioma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C177798","name":"Refractory WHO Grade 1 Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C182436","name":"Diffuse Non-Pontine Midline Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185369","name":"Diffuse Midline Glioma, EGFR-Mutant","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C188924","name":"Childhood Diffuse Intrinsic Pontine Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C188925","name":"Adult Diffuse Intrinsic Pontine Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C129309","name":"Diffuse Midline Glioma, H3 K27M-Mutant","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C198973","name":"Personal History of Low Grade Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C26353","name":"Leucine-Rich Glioma-Inactivated Protein 1","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C182306","name":"Imaging Findings of Diffuse Midline Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185220","name":"Diffuse Low Grade Glioma, FGFR1-Mutant","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185368","name":"Diffuse Midline Glioma, H3 K27-Altered","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C185370","name":"Diffuse Midline Glioma with EZHIP Overexpression","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185371","name":"Diffuse Hemispheric Glioma, H3 G34-Mutant","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C185486","name":"Pediatric Glioma MYCN Molecular Signature Detected","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185487","name":"Pediatric Glioma RTK1 Molecular Signature Detected","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185488","name":"Pediatric Glioma RTK2 Molecular Signature Detected","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185472","name":"Infant-Type Hemispheric Glioma, NTRK-Altered","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185473","name":"Infant-Type Hemispheric Glioma, ROS1-Altered","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185474","name":"Infant-Type Hemispheric Glioma, ALK-Altered","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185475","name":"Infant-Type Hemispheric Glioma, MET-Altered","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C21965","name":"Mouse Chordoid Glioma of the 3rd Ventricle","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C64046","name":"Malignant Glioma of the Rat Spinal Cord","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C157119","name":"Truncated Glioma-Associated Oncogene Homolog 1 Protein","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C157531","name":"CPTAC Brain Lower Grade Glioma Baseline Form","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C179222","name":"Recurrent Diffuse Midline Glioma, H3 K27M-Mutant","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185218","name":"Diffuse Low Grade Glioma, MAPK Pathway-Altered","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C185221","name":"Diffuse Low Grade Glioma, BRAF p.V600E-Mutant","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185468","name":"Diffuse Pediatric-Type High Grade Glioma RTK2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185469","name":"Diffuse Pediatric-Type High Grade Glioma RTK1","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185470","name":"Diffuse Pediatric-Type High Grade Glioma MYCN","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C188922","name":"Childhood Diffuse Midline Glioma, H3 K27-Altered","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C188923","name":"Adult Diffuse Midline Glioma, H3 K27-Altered","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C188926","name":"Childhood Diffuse Hemispheric Glioma, H3 G34-Mutant","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C188927","name":"Adult Diffuse Hemispheric Glioma, H3 G34-Mutant","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C126030","name":"Modified RANO Van Den Bent Glioma 2011 Oncology Response Criteria","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C64034","name":"Benign Mixed Glioma of the Rat Spinal Cord","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C64050","name":"Malignant Mixed Glioma of the Rat Spinal Cord","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185219","name":"Diffuse Low Grade Glioma, FGFR1 Tyrosine Kinase Domain-Duplicated","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C114496","name":"Glioma-associated Peptide-loaded Dendritic Cell Vaccine SL-701","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C74036","name":"Glioma-Associated Antigen Peptide-Pulsed Autologous Dendritic Cell Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C182341","name":"Features Typical for Diffuse Midline Glioma Imaging Assessment","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82661","name":"HLA-A2-Restricted Synthetic Glioma Antigen Peptides Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C182348","name":"Exophytic Diffuse Intrinsic Pontine Glioma Morphology Imaging Finding","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C182398","name":"Contained Diffuse Intrinsic Pontine Glioma Morphology Imaging Finding","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C121688","name":"Nasal Glial Heterotopia","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C174539","name":"Retinal Astrocytoma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C3795","name":"Subependymoma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C74057","name":"Malignant Glioma Tumor Lysate-Pulsed Autologous Dendritic Cell Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185467","name":"Diffuse Pediatric-Type High Grade Glioma, H3-Wildtype and IDH-Wildtype","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C4050","name":"Oligoastrocytoma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C18171","name":"Zinc Finger Protein GLI1","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C101257","name":"IGF-1R Antisense Oligodeoxynucleotide-treated Autologous Glioma Cells IGV-001","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C180886","name":"International Diffuse Intrinsic Pontine Glioma Registry Case Report Form Questionnaire","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185195","name":"Diffuse Astrocytoma, MYB-Altered","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C185196","name":"Diffuse Astrocytoma, MYBL1-Altered","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C6959","name":"Anaplastic Oligoastrocytoma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C106060","name":"PHD Finger Protein 20","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C26288","name":"YEATS Domain-Containing Protein 4","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C95420","name":"DKK3 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C183051","name":"International DIPG/DMG Registry Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C54261","name":"YEATS4 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C134862","name":"GLI1 Positive","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C17338","name":"Tenascin","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C17701","name":"GLI Family Protein","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C26200","name":"Leucine-Rich Repeat Neuronal Protein 2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C38933","name":"Golgi-Associated Plant Pathogenesis-Related Protein 1","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C52931","name":"GLI1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C180378","name":"Polymorphous Low Grade Neuroepithelial Tumor of the Young","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183053","name":"DIPG/DMG CRF1 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183054","name":"DIPG/DMG CRF2 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183055","name":"DIPG/DMG CRF3 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183056","name":"DIPG/DMG CRF4 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183057","name":"DIPG/DMG CRF5 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183058","name":"DIPG/DMG CRF6 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183059","name":"DIPG/DMG CRF7 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C183060","name":"DIPG/DMG CRF8 Terminology","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C54258","name":"LRRN2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C17410","name":"Zinc Finger Protein GLI3","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C18048","name":"Zinc Finger Protein GLI2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C186867","name":"GLI1 Gene Rearrangement","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C54290","name":"LGI1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C24548","name":"LGI1 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C156923","name":"Non-Canonical BAF Complex","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C157117","name":"tGLI1 Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C54276","name":"BICRA wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C26432","name":"BRD4-Interacting Chromatin-Remodeling Complex-Associated Protein","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C26433","name":"Ribosome Biogenesis Protein NOP53","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C52924","name":"GLI2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C54279","name":"NOP53 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185180","name":"Lipidized Glioblastoma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C157087","name":"BICRAL wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C157088","name":"BRD4-Interacting Chromatin-Remodeling Complex-Associated Protein-Like","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C170923","name":"GLI1/ACTB Fusion Protein","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C170922","name":"ACTB/GLI1 Fusion Protein","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C41842","name":"Gliomatosis Cerebri Type I","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C41843","name":"Gliomatosis Cerebri Type II","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C4318","name":"Gliomatosis Cerebri","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C114969","name":"Childhood Gliomatosis Cerebri","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C126360","name":"Peritoneal Gliomatosis","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C21964","name":"Mouse Gliomatosis Cerebri","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C5446","name":"Meningeal Gliomatosis","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C115366","name":"Recurrent Childhood Gliomatosis Cerebri","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C115944","name":"Untreated Childhood Gliomatosis Cerebri","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C179221","name":"Recurrent Gliomatosis Cerebri","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C21947","name":"Mixed Mouse Gliomas","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C119310","name":"Acremonium atrogriseum","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C10122","name":"TPDCV Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C105813","name":"Ad-hCMV-Flt3L","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C106347","name":"EFEMP1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C111042","name":"STAT3 Inhibitor WP1066","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C113548","name":"CHN2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C114755","name":"EGFRvIII Peptide Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C114879","name":"Response Assessment in Neuro-Oncology Criteria","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C116331","name":"Synthetic Glioblastoma Tumor-associated Peptides Vaccine Therapy APVAC1","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C117235","name":"IDH1R132H-Specific Peptide Vaccine PEPIDH1M","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C117280","name":"IDH1 NP_005887.2:p.R132X","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C121457","name":"IDH1(R132) Inhibitor IDH305","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C122678","name":"IDH1R132H Mutation-targeting IDH1 Peptide Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C127861","name":"Combs Prognostic Index","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C129687","name":"Olutasidenib","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C130998","name":"Osteoporosis Pseudoglioma Syndrome","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C131131","name":"Immunotherapy Response Assessment in Neuro-Oncology Criteria","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C135612","name":"Neural Stem Cells-expressing CRAd-S-pk7","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C139551","name":"Oncolytic HSV-1 rQNestin34.5v.2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C141441","name":"Autosomal Dominant Lateral Temporal Lobe Epilepsy","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C143065","name":"LARP4B wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C148134","name":"Safusidenib","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C158535","name":"RUNDC1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C159998","name":"Bevacizumab Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C160007","name":"Carmustine Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C160014","name":"Cyclophosphamide Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C160081","name":"Lomustine Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C160099","name":"Etoposide Oral Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C160527","name":"Bevacizumab/Carboplatin Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C161915","name":"Cisplatin/Cytarabine/Dacarbazine/Hydroxyurea/Lomustine/Methylprednisolone/Procarbazine/Vincristine Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C161997","name":"TPCH Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C162635","name":"Oncolytic HSV-1 C134","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C167056","name":"Chlorotoxin (EQ)-CD28-CD3zeta-CD19t-expressing CAR T-lymphocytes","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C171348","name":"Iodine I 131 IPA","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C175542","name":"IDH1 Mutant Inhibitor LY3410738","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C179314","name":"(R)-2-Hydroxyglutarate","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C180836","name":"Anti-EGFRvIII/CD3 Bispecific Antibody hEGFRvIII:CD3 bi-scFv","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C182143","name":"PAI-1 Inhibitor ACT001","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C184943","name":"Oncolytic HSV-1 Expressing IL-12 and Anti-PD-1 Antibody MVR-C5252","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185215","name":"del(6)(q23q26)","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C185216","name":"MYB/QKI Fusion Gene","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C186377","name":"Anti-EGFRvIII/CD3 Bispecific Antibody RO7428731","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C186557","name":"FGFR1/TACC1 Fusion Gene","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C186586","name":"Zinc Finger Protein 148","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C192844","name":"Neoantigen Heat Shock Protein Vaccine rHSC-DIPGVax","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C1958","name":"Monoclonal Antibody 81C6","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C198862","name":"Modified Macdonald Tumor Response Criteria","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C198863","name":"RAPNO Tumor Response Criteria","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C198977","name":"Autologous CLTX-targeted CAR T-lymphocytes CHM 1101","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C2409","name":"Monoclonal Antibody Me1-14 F(ab')2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C2432","name":"Vitespen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C2488","name":"Iodine I 131 Monoclonal Antibody 81C6","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C2489","name":"I 123 Monoclonal Antibody 81C6","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C2490","name":"At 211 Monoclonal Antibody 81C6","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C2676","name":"Oncolytic HSV-1 G207","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C29908","name":"RCAS-Akt","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C29910","name":"RCAS-Ras","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C3273","name":"Neurofibromatosis Type 1","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C3274","name":"Neurofibromatosis Type 2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C35926","name":"Glomeruloid Vessels Present","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C36501","name":"Loss of Chromosome 1p","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C36507","name":"Loss of Chromosome 19q","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C3697","name":"Myxopapillary Ependymoma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C3796","name":"Gliosarcoma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C38139","name":"Talampanel","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C4049","name":"Anaplastic Ependymoma","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C4801","name":"Optic Nerve Neoplasm","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C49090","name":"VGEFR/c-kit/PDGFR Tyrosine Kinase Inhibitor XL820","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C5132","name":"Childhood Central Nervous System Neoplasm","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C5419","name":"Gliofibroma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C63491","name":"PCV Regimen","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C64785","name":"AdRTVP-1-Transduced Prostate Cancer Cell-Based Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C6727","name":"Neurofibromatosis","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C68766","name":"Oligodendroglial Component Present","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C74079","name":"Synthetic Brain Tumor Peptides-Pulsed Autologous Dendritic Cell Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C77600","name":"Disufenton Sodium","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C79843","name":"Bizaxofusp","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C80724","name":"MIR128-2 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C80740","name":"MIR21 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81745","name":"MIR181A1 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81746","name":"MIR181A2 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81769","name":"MIR128-1 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81770","name":"MIR181B1 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81771","name":"MIR181B2 Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81779","name":"MIR146B Gene","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C81899","name":"MIR21 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82073","name":"MIR128-1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82075","name":"MIR128-2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82099","name":"MIR146B wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82112","name":"MIR181A1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82121","name":"MIR181A2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82122","name":"MIR181B1 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C82123","name":"MIR181B2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C8272","name":"Mixed Astrocytoma-Ependymoma-Oligodendroglioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C855","name":"Tamoxifen Citrate","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C90577","name":"Allogeneic IL13-Zetakine/HyTK-Expressing-Glucocorticoid Resistant Cytotoxic T Lymphocytes GRm13Z40-2","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C91258","name":"PLAGL2 wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C9293","name":"Central Nervous System Neoplasm","terminology":"ncit","version":"23.06d","leaf":false},{"code":"C94723","name":"Chlorotoxin","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C95069","name":"BSG wt Allele","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C96348","name":"Multiple Serpentine Pseudopalisading Pattern","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C97666","name":"Brain Tumor Initiating Cell Vaccine","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C99461","name":"Paclitaxel Trevatide","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C60443","name":"Rat Malignant Glioma","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C6961","name":"Chordoid Glioma of the Third Ventricle","terminology":"ncit","version":"23.06d","leaf":true},{"code":"C6988","name":"Oligoastrocytoma","terminology":"ncit","version":"23.06d","leaf":true}]} 
  */
