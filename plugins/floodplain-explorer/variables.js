define([
	"dojo/_base/declare"
],
function ( 	declare ) {
        "use strict";
        return declare(null, {
			makeVariables: function(t){	
				// map service URL
				t.url = "https://cirrus.tnc.org/arcgis/rest/services/FN_AGR/Meramec/MapServer";
				// build top level controls
				t.topObj = {
					introP: "This floodplain prioritization tool is designed to identify critical opportunities for floodplain protection and restoration in the lower Meramec River basin in Missouri. Use the selector widgets below to specify criteria related to water quality, wildlife habitat, and human exposure to flood risk. The map on the right will change in response to your selections to identify sites meeting these criteria, identifying those geographies where floodplain conservation is likely to have the greatest positive impact on the health of this river system.",
					toggleBtns:{
						tb1:{
							header:"Select Flood Frequency",
							name:"floodFreq",
							btns:{
								b1:{
									id:"ff-1",
									value:"1",
									label:"1-in-5-year"
								},
								b2:{
									id:"ff-2",
									value:"2",
									label:"1-in-100-year"
								},
								b3:{
									id:"ff-3",
									value:"3",
									label:"1-in-500-year"
								}
							}	
						},
						tb2:{
							header:"View Floodplains By Watershed",
							name:"huc",
							btns:{
								b1:{
									id:"-h12",
									value:"0",
									label:"HUC-12"
								},
								b2:{
									id:"-catch",
									value:"1",
									label:"Catchment"
								}
							}
						},
						tb3:{
							header:"Select Management Action",
							name:"mngmtAction",
							btns:{
								b1:{
									id:"mact-1",
									value:"p",
									label:"Protection"
								},
								b2:{
									id:"mact-2",
									value:"r",
									label:"Restoration"
								}
							}
						}
					}
				}
				// object to build filter controls
				t.filterObj = {
					group0:{
						header: "Available Floodplain Area",
						controls:{
							con0:{
								type:"slider",
								field:"Acres",
								label:"Available floodplain area for given flood frequency and management action",
								unit:"acres",
								single:true
							}	
						}
					},
					group1:{
						header: "Water Quality",
						controls:{
							con0:{
								type:"slider",
								field:"TN",
								label:"Total nitrogen (SWAT model)",
								unit:""
							},
							con1:{
								type:"slider",
								field:"TP",
								label:"Total phosphorus (SWAT model)",
								unit:""
							},
							con2:{
								type:"slider",
								field:"Sed",
								label:"Sediment (SWAT model)",
								unit:""
							},
							con3:{
								type:"slider",
								field:"SedAcc",
								label:"Accumulated sediment (SWAT model)",
								unit:""
							},
							con4:{
								type:"slider",
								field:"DINCY",
								label:"Nutrient loading to Gulf of Mexico (SPARROW model)",
								unit:""
							}
						}
					},
					group2:{
						header:"Land Conversion",
						controls:{
							con0:{
								type:"slider",
								field:"NCCPI",
								label:"Agricultural productivity potential of soils",
								unit:"",
								single:true
							}
						}
					},
					group3:{
						header:"Connectivity",
						controls:{
							con0:{
								type:"radio",
								field:"impWet",
								label:"Floodplain Wetland Importance Rank"
							},
							con1:{
								type:"radio",
								field:"fprank",
								label:"Floodplain Restoration Rank"
							}
						}
					},
					group4:{
						header:"Priority Conservation Area/Natural Areas",
						controls:{
							con0:{
								type:"slider",
								field:"adjProt",
								label:"Public Lands Adjacency",
								unit:"acres"
							},
							con1:{
								type:"slider",
								field:"EcoSig",
								label:"Ecological Significance Ranking",
								unit:"acres"
							}
						}		
					},
					group5:{
						header:"Habitat",
						controls:{
							con0:{
								type:"radio",
								field:"inIBA",
								label:"Important Bird Areas"
							},
							con1:{
								type:"slider",
								field:"WT_TOT",
								label:"At-Risk Wetland Species",
								unit:""
							},
							con2:{
								type:"radio",
								field:"ABCcorr",
								label:"American Bird Conservancy Corridors & Key Habitat Bird Areas"
							},
							con3:{
								type:"radio",
								field:"anyHab",
								label:"In any of the above 3 Habitat layers"
							},
							con4:{
								type:"slider",
								field:"cumu_hci",
								label:"National Fish Habitat Partnership Cumulative Habitat Condition Index",
								unit:""
							},
							con5:{
								type:"slider",
								field:"HPFedEnd",
								label:"Number of federally endangered species",
								unit:""
							}
						}
					},
					group6:{
						header:"Population Exposure",
						controls:{
							con0:{
								type:"slider",
								field:"popnow",
								label:"Population exposed to floods (present-day)",
								unit:""
							},
							con1:{
								type:"slider",
								field:"pop5",
								label:"Population exposed to floods (present-day) (in all land covers)",
								unit:""
							},
							con2:{
								type:"slider",
								field:"pop100",
								label:"Population exposed to floods (present-day) (in all land covers)",
								unit:""
							},
							con3:{
								type:"slider",
								field:"pop500",
								label:"Population exposed to floods (present-day) (in all land covers)",
								unit:""
							},
							con4:{
								type:"slider",
								field:"pop2050",
								label:"Population exposed to floods (2050)",
								unit:""
							}
						}
					},
					group7:{
						header:"Flood Damages",
						controls:{
							con0:{
								type:"slider",
								field:"Dam2050",
								label:"Potential Future Flood Damages to Structures (2050) ($)",
								unit:""
							}
						}
					},
					group8:{
						header:"Social Vulnerability",
						controls:{
							con0:{
								type:"slider",
								field:"SOVI",
								label:"Index of social vulnerability to environmental hazards",
								unit:""
							}
						}
					}		
				}

				// object to build supporting layers
				t.supportingLayersObj = {
					visible:true,
					clickLayers:true,
					layersToClick:[2,3],
					controls:{
						con0:{
							value:"2",
							label:"Structures in the 1% Annual Exceedance Probability Floodplain"
						},
						con1:{
							value:"3",
							label:"Environmental Hub Analysis"
						}
					}
				}	
				// definition expression root field names
				t.exp = {
					Acres:"", TN:"", TP:"", Sed:"", SedAcc:"", DINCY:"", impWet:"", NCCPI:"", fprank:"", adjProt:"", EcoSig:"", inIBA:"",	WT_TOT:"", ABCcorr:"", anyHab:"", cumu_hci:"", HPFedEnd:"", popnow:"", pop5:"", pop100:"", pop500:"", pop2050:"", Dam2050:"", SOVI:""
				}
				// object for range slider
				t.sliderObj = {
					// huc 12 + protection + 1 in 5 year flood
					h12p1:{
						Acres:{
							values:[],vis:true,min:16,max:633,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						}, 
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},	
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:186,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in natural land cover within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:596,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in natural cover within an ecologically significant	area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.686,max:3.622,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:7,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland/grassland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop5:{
							values:[],vis:true,min:1,max:70,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop100:{
							vis:false
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:1,max:70,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:313176,max:5207579,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-2.166,max:-0.458,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + protection + 1 in 100 year flood
					h12p2:{
						Acres:{
							values:[],vis:true,min:36,max:1579,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:732,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in natural land cover within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:23,max:1360,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in natural cover within an ecologically significant	area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.686,max:3.622,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:7,max:92,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop5:{
							vis:false
						},
						pop100:{
							values:[],vis:true,min:90,max:1097,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:15,max:515,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:1116767,max:82900000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-2.166,max:-0.458,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + protection + 1 in 500 year flood
					h12p3:{
						Acres:{
							values:[],vis:true,min:94,max:2500,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:825,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in natural land cover within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:65,max:1914,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in natural cover within an ecologically significant	area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.686,max:3.622,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:14,max:384,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop5:{
							vis:false
						},
						pop100:{
							vis:false
						},
						pop500:{
							values:[],vis:true,min:145,max:4476,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop2050:{
							values:[],vis:true,min:42,max:721,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:3928452,max:150000000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-2.166,max:-0.458,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},

					// huc 12 + restoration + 1 in 5 year flood
					h12r1:{
						Acres:{
							values:[],vis:true,min:2,max:712,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0.147,max:0.599,step:0.001,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:98,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in ag or potentially grazed land within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. & Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:217,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in ag or potentially grazed land within an ecologically significant area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.686,max:3.622,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:17,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected flood frequency."
						},
						pop5:{
							values:[],vis:true,min:1,max:70,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop100:{
							vis:false
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:0,max:62,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:105857,max:5013107,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-2.166,max:-0.458,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + restoration + 1 in 100 year flood
					h12r2:{
						Acres:{
							values:[],vis:true,min:183,max:4076,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0.429,max:0.544,step:0.001,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:554,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in ag or potentially grazed land within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. & Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:123,max:1343,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in ag or potentially grazed land within an ecologically significant area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.686,max:3.622,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:14,max:270,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected flood frequency."
						},
						pop5:{
							vis:false
						},
						pop100:{
							values:[],vis:true,min:90,max:1097,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:11,max:410,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected flood frequency in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:983579,max:61200000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-2.166,max:-0.458,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// huc 12 + restoration + 1 in 500 year flood
					h12r3:{
						Acres:{
							values:[],vis:true,min:295,max:5523,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0.412,max:0.522,step:0.001,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:651,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in ag or potentially grazed land within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. & Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:135,max:2319,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in ag or potentially grazed land within an ecologically significant area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.686,max:3.622,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:37,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:32,max:731,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected flood frequency."
						},
						pop5:{
							vis:false
						},
						pop100:{
							vis:false
						},
						pop500:{
							values:[],vis:true,min:145,max:4476,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop2050:{
							values:[],vis:true,min:23,max:861,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected flood frequency in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:2043340,max:134000000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-2.166,max:-0.458,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},

					// catchment + protection + 1 in 5 year flood
					catchp1:{
						Acres:{
							values:[],vis:true,min:0,max:232,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric.<br>"
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:94,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in natural land cover within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:230,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in natural cover within an ecologically significant	area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.000,max:4.801,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:5,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland/grassland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop5:{
							values:[],vis:true,min:0,max:21,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop100:{
							vis:false
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:0,max:33,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland/grassland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:0,max:2315258,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-3.881,max:1.749,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + protection + 1 in 100 year flood
					catchp2:{
						Acres:{
							values:[],vis:true,min:0,max:400,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:222,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in natural land cover within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:396,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in natural cover within an ecologically significant	area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.000,max:4.801,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:19,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop5:{
							vis:false
						},
						pop100:{
							values:[],vis:true,min:0,max:745,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:0,max:136,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:0,max:27400000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-3.881,max:1.749,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + protection + 1 in 500 year flood
					catchp3:{
						Acres:{
							values:[],vis:true,min:0,max:454,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in natural land cover that is not currently in protected status."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For protection priorities, identify catchments <i>lower</i> in this metric. <a href='https://sparrow.wim.usgs.gov/marb/' target='_blank'>More Info</a>"
						},
						NCCPI:{
							vis:false
						},
						adjProt:{
							values:[],vis:true,min:0,max:254,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in natural land cover within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. and Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:447,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in natural cover within an ecologically significant	area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.000,max:4.801,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:46,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in forest/wetland floodplain of the selected flood frequency. <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop5:{
							vis:false
						},
						pop100:{
							vis:false
						},
						pop500:{
							values:[],vis:true,min:0,max:1503,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop2050:{
							values:[],vis:true,min:0,max:154,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in forest/wetland floodplain of the selected flood frequency in 2050. <a href='https://iopscience.iop.org/article/10.1088/1748-9326/aaac65' target='_blank'>More Info</a>"
						},
						Dam2050:{
							values:[],vis:true,min:0,max:40200000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-3.881,max:1.749,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + restoration + 1 in 5 year flood
					catchr1:{
						Acres:{
							values:[],vis:true,min:0,max:159,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:0.746,step:0.001,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:39,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in ag or potentially grazed land within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. & Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:75,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in ag or potentially grazed land within an ecologically significant area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.000,max:4.801,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:12,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected flood frequency."
						},
						pop5:{
							values:[],vis:true,min:0,max:21,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop100:{
							vis:false
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:0,max:19,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected flood frequency in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:2797809,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-3.881,max:1.749,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + restoration + 1 in 100 year flood
					catchr2:{
						Acres:{
							values:[],vis:true,min:0,max:636,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:0.764,step:0.001,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:172,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in ag or potentially grazed land within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. & Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:186,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in ag or potentially grazed land within an ecologically significant area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.000,max:4.801,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:95,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected flood frequency."
						},
						pop5:{
							vis:false
						},
						pop100:{
							values:[],vis:true,min:0,max:745,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop500:{
							vis:false
						},
						pop2050:{
							values:[],vis:true,min:0,max:155,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected flood frequency in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:19500000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-3.881,max:1.749,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					},
					// catchment + restoration + 1 in 500 year flood
					catchr3:{
						Acres:{
							values:[],vis:true,min:0,max:965,
							info:"<b>Available floodplain area for given flood frequency and management action</b><br>Area of floodplain in ag or potentially grazed land that could potentially be restored."
						},
						TN:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total nitrogen (SWAT model)</b><br>Total nitrogen loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						TP:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Total phosphorus (SWAT model)</b><br>Total phosphorus loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						Sed:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Sediment (SWAT model)</b><br>Local sediment loading, according to SWAT modeling. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						SedAcc:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Accumulated sediment (SWAT model)</b><br>Sediment loading, according to SWAT modeling -- accounts for all sediment coming in from upstream. Values normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						DINCY:{
							values:[],vis:true,min:0,max:100,
							info:"<b>Nutrient loading to Gulf of Mexico (SPARROW model)</b><br>Kg/yr of nitrogen and phosphorus from within a given watershed that reaches Gulf of Mexico, divided by watershed area in km2, all normalized to 0-100 scale. For restoration priorities, identify catchments <i>higher</i> in this metric."
						},
						NCCPI:{
							values:[],vis:true,min:0,max:0.764,step:0.001,
							info:"<b>Agricultural productivity potential of soils</b>The National Commodity Crop Productivity Index -- an index characterizing soil's inherent capacity to produce non-irrigated commodity crops (0 - 1). Lower value suggests less productive soil, and therefore more viable opportunity for restoration.<br>"
						},
						adjProt:{
							values:[],vis:true,min:0,max:191,
							info:"<b>Public Lands Adjacency</b><br>Acres of floodplain in ag or potentially grazed land within 1/4 mile of protected land. Protected land includes areas from Protected Areas Database of the U.S. & Great Rivers Greenway infrastructure."
						},
						EcoSig:{
							values:[],vis:true,min:0,max:297,
							info:"<b>Ecological Significance Ranking</b><br>Acres of floodplain in ag or potentially grazed land within an ecologically significant area (significance ranking 4 or above). Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2011_EAI_eco_significance.pdf' target='_blank'>More Info</a>"
						},
						WT_TOT:{
							values:[],vis:true,min:0,max:2,shfld:true,
							info:"<b>At-Risk Wetland Species</b><br>Total number of wetland species in catchment considered Imperiled (G1/G2) by NatureServe or threatened or endangered under the Endangered Species Act. <a href='https://enviroatlas.epa.gov/enviroatlas/DataFactSheets/pdf/ESN/Totalnumberofatriskwetlandspecies.pdf' target='_blank'>More Info</a>"
						},
						cumu_hci:{
							values:[],vis:true,min:1.000,max:4.801,step:0.001,shfld:true,
							info:"<b>National Fish Habitat Partnership Cumulative Habitat Condition Index</b><br>Degree to which anthropogenic stressors in the watershed may be affecting fish habitat. Higher value = less extreme stressors. For protection priorities, identify catchments higher in this metric. <a href='http://assessment.fishhabitat.org/#578a9a48e4b0c1aacab8976c/578a99f4e4b0c1aacab89699' target='_blank'>More Info</a>"
						},
						HPFedEnd:{
							values:[],vis:true,min:0,max:9,shfld:true,
							info:"<b>Number of federally endangered species</b><br>This metric includes data provided by the Missouri Natural Heritage Program (MONHP), Missouri Department of Conservation. The MONHP houses the most complete database on the locations and status of species and natural communities of conservation concern. Data provided by the MONHP are not based on an exhaustive inventory of the state. The lack of data for any geographic area shall not be construed to mean that no significant features are present. Only an on-site survey can determine the presence or absence of natural heritage resources. The information provided for your request is accurate and current as of the last observation date."
						},
						popnow:{
							values:[],vis:true,min:0,max:437,
							info:"<b>Population exposed to floods (present-day)</b><br>People currently living in ag/pasture floodplain of the selected flood frequency."
						},
						pop5:{
							vis:false
						},
						pop100:{
							vis:false
						},
						pop500:{
							values:[],vis:true,min:0,max:1503,shfld:true,
							info:"People currently living in the floodplain of the selected flood frequency, in all land covers.  <a href='https://www.epa.gov/enviroatlas/dasymetric-toolbox' target='_blank'>More Info</a>"
						},
						pop2050:{
							values:[],vis:true,min:0,max:254,
							info:"<b>Population exposed to floods (2050)</b><br>People expected to be living in ag/pasture floodplain of the selected flood frequency in 2050."
						},
						Dam2050:{
							values:[],vis:true,min:0,max:52300000,
							info:"<b>Potential Future Flood Damages to Structures (2050) ($)</b><br>Average between moderate (SSP2) and high (SSP5) socioeconomic development scenarios. Scenario descriptions are available in the <a href='https://www.sciencedirect.com/science/article/pii/S0959378016300681' target='_blank'>linked paper</a>."
						},
						SOVI:{
							values:[],vis:true,min:-3.881,max:1.749,step:0.001,shfld:true,
							info:"<b>Index of social vulnerability to environmental hazards</b><br>Index characterizing social vulnerability to environmental hazards, drawing on 22 demographic variables. At the national scale, values below -1 are considered low social vulnerability, -1 to +1 are medium, and above +1 are high. <a href='http://artsandsciences.sc.edu/geog/hvri/faq' target='_blank'>More Info</a>"
						}
					}
				}

				// object for radio groups
				t.radioObj = {
					// huc 12 + protection + 1 in 5 year flood
					h12p1:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + protection + 1 in 100 year flood
					h12p2:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + protection + 1 in 500 year flood
					h12p3:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}	
					},
					// huc 12 + restoration + 1 in 5 year flood
					h12r1:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:true,
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI_restoration.pdf' target='_blank'>More Info</a>"
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + restoration + 1 in 100 year flood
					h12r2:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:true,
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI_restoration.pdf' target='_blank'>More Info</a>"
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// huc 12 + restoration + 1 in 500 year flood
					h12r3:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:true,
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI_restoration.pdf' target='_blank'>More Info</a>"
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + protection + 1 in 5 year flood
					catchp1:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + protection + 1 in 100 year flood
					catchp2:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + protection + 1 in 500 year flood
					catchp3:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:false
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + restoration + 1 in 5 year flood
					catchr1:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:true,
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI_restoration.pdf' target='_blank'>More Info</a>"
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + restoration + 1 in 100 year flood
					catchr2:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:true,
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI_restoration.pdf' target='_blank'>More Info</a>"
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					},
					// catchment + restoration + 1 in 500 year flood
					catchr3:{
						impWet:{
							vis:true,
							info:"<b>Floodplain Wetland Importance Rank</b><br>Watershed contains floodplain in an area of wetland importance rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI _wetland_importance.pdf' target='_blank'>More Info</a>"
						},
						fprank:{
							vis:true,
							info:"<b>Floodplain Restoration Rank</b><br>Watershed contains floodplain in an area of floodplain restoration rank 5 or above. Data provided by the East-West Gateway Council of Governments. <a href='plugins/floodplain-explorer/2015_EAI_restoration.pdf' target='_blank'>More Info</a>"
						},
						inIBA:{
							vis:true,
							info:"<b>Important Bird Areas</b></br>Sites identified by Audubon as having significance for the conservation of birds, supporting rare and endangered species as well as globally important concentrations of non-endangered species. <a href='https://www.audubon.org/important-bird-areas' target='_blank'>More Info</a>"
						},
						ABCcorr:{
							vis:true,shfld:true,
							info:"<b>American Bird Conservancy Corridors & Key Habitat Bird Areas</b><br>This layer represents key bird migration corridors and habitat for birds on the Red WatchList. <a href='https://www.sciencebase.gov/catalog/item/58497c09e4b06d80b7b09483' target='_blank'>More Info</a>"
						},
						anyHab:{
							vis:true,
							info:"<b>In any of the above 3 habitat layers</b><br>In an Important Bird Area, contains at-risk wetland species, or in an American Bird Conservancy corridor."
						}
					}
				}
				
			},
			modifications: function(t){
				// Wrap header with div
				$(`h4:contains("Select Flood Frequency")`).wrap('<div id="' + t.id + 'ff-wrap" style="position:relative;"/>')
				// Add info icon next to Select Flood Frequency
				$(`#${t.id}ff-wrap`).prepend(`
					<div class="ffInfoWrap feInfoWrap">
						<i class="fa fa-info-circle feInfo feInfoOpen"></i>
					</div>
					<div class="feInfoTextWrap ffTestWrap">
						<span class="feInfoText"><b>Flood Frequency</b><br>In any given year, there is a 20% chance of a 1-in-5-year (or greater) flood, a 1% chance of a 1-in-100-year (or greater) flood, and a 0.2% chance of a 1-in-500-year (or greater) flood. <a href='https://www.usgs.gov/special-topic/water-science-school/science/floods-and-recurrence-intervals?qt-science_center_objects=0#qt-science_center_objects' target='_blank'>More Info</a></span>
						<i class="fa fa-close feInfo feInfoClose"></i>
					</div>
				`)
				// Wrap header with div
				$(`h4:contains("Select Management Action")`).wrap('<div id="' + t.id + 'ma-wrap" style="position:relative;"/>')
				// Add info icon next to Select Management Action
				$(`#${t.id}ma-wrap`).prepend(`
					<div class="ffInfoWrap feInfoWrap">
						<i class="fa fa-info-circle feInfo feInfoOpen"></i>
					</div>
					<div class="feInfoTextWrap ffTestWrap">
						<span class="feInfoText"><b>Management Action</b><br>If you choose &quot;protection&quot;, you are basing analysis on floodplains in forest/wetland/grassland. If you choose &quot;restoration&quot;, you are basing analysis on floodplain in agricultural and pasture land.</span>
						<i class="fa fa-close feInfo feInfoClose"></i>
					</div>
				`)
				// Wrap header with div
				$(`h4:contains("View Floodplains By Watershed")`).wrap('<div id="' + t.id + 'fbw-wrap" style="position:relative;"/>')
				// Add info icon next to Select Management Action
				$(`#${t.id}fbw-wrap`).prepend(`
					<div class="ffInfoWrap feInfoWrap">
						<i class="fa fa-info-circle feInfo feInfoOpen"></i>
					</div>
					<div class="feInfoTextWrap ffTestWrap">
						<span class="feInfoText"><b>Floodplains By Watershed</b><br>You may click on a HUC12 or catchment unit on the map to view a pop-up box with more information about attributes for that unit.</span>
						<i class="fa fa-close feInfo feInfoClose"></i>
					</div>
				`)
				// Handle clicks on info icons created above
				$(`#${t.id}top-controls i`).click(function(c){
					var e = c.currentTarget;
					$(".feInfoTextWrap").hide();
					$(".ffInfoWrap").show();
					if ( $(e).hasClass('feInfoOpen') ){
						$(e).parent().parent().find(".feInfoTextWrap").show();
					}
					if ( $(e).hasClass('feInfoClose') ){
						$(e).parent().parent().find(".feInfoWrap").show();
					}
					$(e).parent().hide();
				})
				$(`.ffTestWrap`).css({"right":"14px","top":"9px"})
			},
			eventMods: function(t){
				// turn off floodplain layers
				let ids = [4,5,6]
				$.each(t.obj.supportingLayers,function(i,v){
					$.each(ids,function(i1,v1){
						if (v == v1){
							let index = t.obj.supportingLayers.indexOf(v);
							t.obj.supportingLayers.splice(index,1);
						}
					})
				})
				// add selected floodplain layer
				t.obj.supportingLayers.push(ids[t.obj.floodFreq-1])
				t.supportingLayer.setVisibleLayers(t.obj.supportingLayers)
			}
		});
    }
);