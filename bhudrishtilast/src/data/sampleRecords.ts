import type { LandRecordDocument } from '../types';

export const INITIAL_LAND_RECORDS: LandRecordDocument[] = [
  {
    id: "DOC-UP-2026-001",
    documentTitle: "उत्तर प्रदेश भूलेख — खसरा खतौनी (प्रपत्र CH-41) ग्राम रामपुर कलां",
    state: "Uttar Pradesh",
    district: "Lucknow",
    tehsil: "Sadar",
    village: "Rampur Kalan",
    villageLgdCode: "142850",
    documentType: "UP Khasra-Khatauni (Form CH-41)",
    script: "Devanagari (Hindi)",
    scanImageUrl: "/assets/scans/up_khasra_sample.svg",
    preprocessedImageUrl: "/assets/scans/up_khasra_preprocessed.svg",
    cvDetails: {
      originalResolution: "2400 x 3200 (300 DPI)",
      deskewAngleDegrees: 1.42,
      binarizationMethod: "Otsu Adaptive Thresholding",
      contrastStretchGain: 1.85,
      denoiseFilter: "Non-Local Means (NLM)",
      clarityScore: 91,
      processingTimeMs: 420
    },
    khataNumber: {
      value: "104",
      confidence: 97,
      boundingBox: { ymin: 140, xmin: 180, ymax: 175, xmax: 310 },
      sourceTextSnippet: "खाता संख्या : १०४ (१०४)"
    },
    khasraNumber: {
      value: "214/2",
      confidence: 96,
      boundingBox: { ymin: 185, xmin: 180, ymax: 220, xmax: 330 },
      sourceTextSnippet: "खसरा / गाटा संख्या : २१४/२"
    },
    subDivision: {
      value: "ब (Ba)",
      confidence: 92,
      boundingBox: { ymin: 225, xmin: 180, ymax: 255, xmax: 290 },
      sourceTextSnippet: "उप-विभाजन : ब"
    },
    totalAreaHectare: {
      value: 1.425,
      confidence: 94,
      boundingBox: { ymin: 265, xmin: 180, ymax: 300, xmax: 360 },
      sourceTextSnippet: "क्षेत्रफल : १.४२५० हे."
    },
    traditionalAreaUnit: {
      value: "3 Bigha 8 Biswa",
      confidence: 89,
      boundingBox: { ymin: 305, xmin: 180, ymax: 335, xmax: 380 },
      sourceTextSnippet: "पारंपरिक माप : ३ बीघा ८ बिस्वा"
    },
    landClassification: {
      value: "Agricultural (Chahi)",
      confidence: 95,
      boundingBox: { ymin: 345, xmin: 180, ymax: 375, xmax: 420 },
      sourceTextSnippet: "भूमि श्रेणी : १-क (कृषि सिंचित - नलकूप)"
    },
    irrigationSource: {
      value: "Private Borewell / Sharda Canal Canal Distributary",
      confidence: 93,
      boundingBox: { ymin: 385, xmin: 180, ymax: 415, xmax: 460 },
      sourceTextSnippet: "सिंचाई साधन : निजी नलकूप / नहर"
    },
    shareholders: [
      {
        id: "sh-1",
        name: {
          value: "Rameshwar Dayal",
          confidence: 98,
          boundingBox: { ymin: 440, xmin: 120, ymax: 470, xmax: 350 },
          sourceTextSnippet: "रामेश्वर दयाल"
        },
        fatherOrHusbandName: {
          value: "Shiv Prasad",
          confidence: 96,
          boundingBox: { ymin: 440, xmin: 360, ymax: 470, xmax: 560 },
          sourceTextSnippet: "पुत्र शिव प्रसाद"
        },
        shareFraction: {
          value: "1/2",
          confidence: 99,
          boundingBox: { ymin: 440, xmin: 580, ymax: 470, xmax: 660 },
          sourceTextSnippet: "अंश १/२"
        },
        sharePercentage: 50,
        aadhaarVaultRef: "VAULT-UP-9412-8812",
        status: "Living"
      },
      {
        id: "sh-2",
        name: {
          value: "Smt. Kamla Devi",
          confidence: 95,
          boundingBox: { ymin: 480, xmin: 120, ymax: 510, xmax: 350 },
          sourceTextSnippet: "श्रीमती कमला देवी"
        },
        fatherOrHusbandName: {
          value: "Late Brijesh Dayal",
          confidence: 94,
          boundingBox: { ymin: 480, xmin: 360, ymax: 510, xmax: 560 },
          sourceTextSnippet: "पत्नी स्व. बृजेश दयाल"
        },
        shareFraction: {
          value: "1/4",
          confidence: 97,
          boundingBox: { ymin: 480, xmin: 580, ymax: 510, xmax: 660 },
          sourceTextSnippet: "अंश १/४"
        },
        sharePercentage: 25,
        aadhaarVaultRef: "VAULT-UP-7721-3401",
        status: "Living"
      },
      {
        id: "sh-3",
        name: {
          value: "Maheshwar Dayal",
          confidence: 96,
          boundingBox: { ymin: 520, xmin: 120, ymax: 550, xmax: 350 },
          sourceTextSnippet: "महेश्वर दयाल"
        },
        fatherOrHusbandName: {
          value: "Shiv Prasad",
          confidence: 95,
          boundingBox: { ymin: 520, xmin: 360, ymax: 550, xmax: 560 },
          sourceTextSnippet: "पुत्र शिव प्रसाद"
        },
        shareFraction: {
          value: "1/4",
          confidence: 98,
          boundingBox: { ymin: 520, xmin: 580, ymax: 550, xmax: 660 },
          sourceTextSnippet: "अंश १/४"
        },
        sharePercentage: 25,
        aadhaarVaultRef: "VAULT-UP-6610-9092",
        status: "Living"
      }
    ],
    totalSharePercentage: 100,
    isShareBalanced: true,
    mutations: [
      {
        mutationNumber: {
          value: "MUT-2023-8819",
          confidence: 97,
          boundingBox: { ymin: 600, xmin: 120, ymax: 630, xmax: 280 },
          sourceTextSnippet: "नामांतरण आदेश सं. २०२३/८८१९"
        },
        mutationDate: {
          value: "14/09/2023",
          confidence: 94,
          boundingBox: { ymin: 600, xmin: 290, ymax: 630, xmax: 420 },
          sourceTextSnippet: "दिनांक १४/०९/२०२३"
        },
        transferType: {
          value: "Inheritance (Varisani)",
          confidence: 96,
          boundingBox: { ymin: 600, xmin: 430, ymax: 630, xmax: 600 },
          sourceTextSnippet: "वारिसानी आदेश (धारा ३३)"
        },
        predecessorName: {
          value: "Brijesh Dayal (Deceased)",
          confidence: 95,
          boundingBox: { ymin: 640, xmin: 120, ymax: 670, xmax: 350 },
          sourceTextSnippet: "मृतक: बृजेश दयाल"
        },
        successorName: {
          value: "Smt. Kamla Devi (Widow)",
          confidence: 95,
          boundingBox: { ymin: 640, xmin: 360, ymax: 670, xmax: 600 },
          sourceTextSnippet: "वारिस: श्रीमती कमला देवी"
        },
        orderAuthority: {
          value: "Naib Tehsildar, Circle Bakshi Ka Talab",
          confidence: 93,
          boundingBox: { ymin: 680, xmin: 120, ymax: 710, xmax: 500 },
          sourceTextSnippet: "आदेश कर्ता: नायब तहसीलदार, बीकेटी"
        },
        status: "Sanctioned"
      }
    ],
    encumbrances: [
      {
        bankOrCourt: "Baroda UP Gramin Bank, Branch Malihabad",
        amount: 180000,
        type: "KCC Loan",
        dateRecorded: "2021-06-15",
        cleared: false
      }
    ],
    lrmsCheck: {
      lrmsRecordFound: true,
      lrmsKhasra: "214/2",
      lrmsKhata: "104",
      lrmsTotalAreaHectares: 1.250, // Notice the delta: scan says 1.425, LRMS legacy says 1.250!
      lrmsOwners: ["Rameshwar Dayal", "Kamla Devi", "Maheshwar Dayal"],
      lrmsMutationsCount: 1,
      discrepancies: [
        {
          field: "totalAreaHectare",
          extractedValue: 1.425,
          lrmsValue: 1.250,
          severity: "MEDIUM",
          message: "Scan records 1.425 Ha; State LRMS legacy register records 1.250 Ha (Delta: +0.175 Ha / +14.0%). Patwari field verification recommended."
        }
      ],
      isLrmsSynced: false,
      lastLrmsUpdate: "2024-01-10T11:20:00Z"
    },
    cadastralGeometry: {
      khasraNumber: "214/2",
      villageCode: "142850",
      areaDeclaredHa: 1.425,
      areaCalculatedHa: 1.420,
      areaDeltaPercentage: 0.35,
      polygonValid: true,
      hasSelfIntersection: false,
      encroachmentDetected: false,
      overlapWithAdjacentParcel: false,
      coordinates: [
        [26.8485, 80.9421],
        [26.8492, 80.9465],
        [26.8458, 80.9458],
        [26.8452, 80.9415]
      ]
    },
    risk: {
      overallScore: 38,
      severity: "MEDIUM",
      routingRecommendation: "PATWARI_VERIFICATION_REQUIRED",
      factors: [
        {
          category: "Cadastral & Area",
          scoreImpact: 22,
          severity: "MEDIUM",
          ruleCode: "UP-RC-SEC-28",
          description: "Area discrepancy of 0.175 Ha between scanned document and Bhulekh database.",
          remedyRecommendation: "Patwari spot verification and digital total station survey check required before certification."
        },
        {
          category: "Ownership & Share",
          scoreImpact: 8,
          severity: "LOW",
          ruleCode: "RULE-SHARE-BAL-01",
          description: "Share fractions match 100% (1/2 + 1/4 + 1/4 = 1.0).",
          remedyRecommendation: "None. Ownership integrity is mathematically verified."
        },
        {
          category: "Scan & OCR Quality",
          scoreImpact: 8,
          severity: "LOW",
          ruleCode: "OCR-CONF-THRESH",
          description: "Average extraction confidence 95.1%. All critical entities exceed 90%.",
          remedyRecommendation: "High-quality Devanagari scan accepted."
        }
      ],
      canBeSealed: false,
      blockReason: "Requires Patwari area discrepancy confirmation before Tehsildar sealing."
    },
    status: "NEEDS_CORRECTION",
    createdAt: "2026-09-08T09:30:00Z",
    updatedAt: "2026-09-10T14:15:00Z"
  },
  {
    id: "DOC-MH-2026-002",
    documentTitle: "महाराष्ट्र शासन महसूल विभाग — गाव नमुना ७/१२ (सातबारा) मौजे बारामती",
    state: "Maharashtra",
    district: "Pune",
    tehsil: "Baramati",
    village: "Mauje Baramati",
    villageLgdCode: "556120",
    documentType: "Maharashtra 7/12 (Satbara)",
    script: "Modi / Marathi",
    scanImageUrl: "/assets/scans/mh_712_sample.svg",
    preprocessedImageUrl: "/assets/scans/mh_712_preprocessed.svg",
    cvDetails: {
      originalResolution: "2200 x 3100 (300 DPI)",
      deskewAngleDegrees: 0.65,
      binarizationMethod: "Sauvola Local Thresholding",
      contrastStretchGain: 1.60,
      denoiseFilter: "Non-Local Means (NLM)",
      clarityScore: 96,
      processingTimeMs: 380
    },
    khataNumber: {
      value: "45",
      confidence: 99,
      boundingBox: { ymin: 130, xmin: 160, ymax: 165, xmax: 270 },
      sourceTextSnippet: "खाते क्रमांक : ४५"
    },
    khasraNumber: {
      value: "108",
      confidence: 99,
      boundingBox: { ymin: 170, xmin: 160, ymax: 205, xmax: 290 },
      sourceTextSnippet: "गट क्रमांक : १०८"
    },
    subDivision: {
      value: "अ (A)",
      confidence: 95,
      boundingBox: { ymin: 210, xmin: 160, ymax: 240, xmax: 250 },
      sourceTextSnippet: "पोट हिस्सा : अ"
    },
    totalAreaHectare: {
      value: 2.15,
      confidence: 98,
      boundingBox: { ymin: 250, xmin: 160, ymax: 285, xmax: 340 },
      sourceTextSnippet: "एकूण क्षेत्र : २.१५ हे. आर"
    },
    traditionalAreaUnit: {
      value: "2 Hectare 15 R (Ares)",
      confidence: 97,
      boundingBox: { ymin: 290, xmin: 160, ymax: 320, xmax: 390 },
      sourceTextSnippet: "२ हेक्टर १५ आर"
    },
    landClassification: {
      value: "Agricultural (Chahi)",
      confidence: 98,
      boundingBox: { ymin: 330, xmin: 160, ymax: 360, xmax: 420 },
      sourceTextSnippet: "जमीन प्रकार : जिरायत / बागायत"
    },
    irrigationSource: {
      value: "Nira Left Bank Canal & Drip Irrigation",
      confidence: 95,
      boundingBox: { ymin: 370, xmin: 160, ymax: 400, xmax: 480 },
      sourceTextSnippet: "पाणीपुरवठा : निरा डावा कालवा / ठिबक"
    },
    shareholders: [
      {
        id: "sh-mh-1",
        name: {
          value: "Anand Dattatray Patil",
          confidence: 99,
          boundingBox: { ymin: 430, xmin: 140, ymax: 460, xmax: 400 },
          sourceTextSnippet: "आनंद दत्तात्रय पाटील"
        },
        fatherOrHusbandName: {
          value: "Dattatray Mahadev Patil",
          confidence: 98,
          boundingBox: { ymin: 430, xmin: 410, ymax: 460, xmax: 650 },
          sourceTextSnippet: "वडील दत्तात्रय महादेव पाटील"
        },
        shareFraction: {
          value: "1/1",
          confidence: 99,
          boundingBox: { ymin: 430, xmin: 660, ymax: 460, xmax: 740 },
          sourceTextSnippet: "अंश १/१ (पूर्ण)"
        },
        sharePercentage: 100,
        aadhaarVaultRef: "VAULT-MH-4412-9901",
        status: "Living"
      }
    ],
    totalSharePercentage: 100,
    isShareBalanced: true,
    mutations: [
      {
        mutationNumber: {
          value: "फेरफार क्र. ४४१२",
          confidence: 98,
          boundingBox: { ymin: 520, xmin: 120, ymax: 550, xmax: 310 },
          sourceTextSnippet: "फेरफार क्र. ४४१२"
        },
        mutationDate: {
          value: "22/11/2022",
          confidence: 97,
          boundingBox: { ymin: 520, xmin: 320, ymax: 550, xmax: 460 },
          sourceTextSnippet: "दिनांक २२/११/२०२२"
        },
        transferType: {
          value: "Inheritance (Varisani)",
          confidence: 98,
          boundingBox: { ymin: 520, xmin: 470, ymax: 550, xmax: 640 },
          sourceTextSnippet: "वारस नोंद (कलम १४९)"
        },
        predecessorName: {
          value: "Dattatray Mahadev Patil",
          confidence: 97,
          boundingBox: { ymin: 560, xmin: 120, ymax: 590, xmax: 380 },
          sourceTextSnippet: "मयत: दत्तात्रय महादेव पाटील"
        },
        successorName: {
          value: "Anand Dattatray Patil",
          confidence: 98,
          boundingBox: { ymin: 560, xmin: 390, ymax: 590, xmax: 640 },
          sourceTextSnippet: "वारसदार: आनंद दत्तात्रय पाटील"
        },
        orderAuthority: {
          value: "Mandal Adhikari, Baramati Circle",
          confidence: 96,
          boundingBox: { ymin: 600, xmin: 120, ymax: 630, xmax: 480 },
          sourceTextSnippet: "मंजूर अधिकारी: मंडळ अधिकारी, बारामती"
        },
        status: "Sanctioned"
      }
    ],
    encumbrances: [
      {
        bankOrCourt: "Bank of Maharashtra, Baramati Main Branch",
        amount: 250000,
        type: "Bank Hypothecation",
        dateRecorded: "2023-03-10",
        cleared: false
      }
    ],
    lrmsCheck: {
      lrmsRecordFound: true,
      lrmsKhasra: "108",
      lrmsKhata: "45",
      lrmsTotalAreaHectares: 2.15,
      lrmsOwners: ["Anand Dattatray Patil"],
      lrmsMutationsCount: 1,
      discrepancies: [],
      isLrmsSynced: true,
      lastLrmsUpdate: "2024-04-18T08:45:00Z"
    },
    cadastralGeometry: {
      khasraNumber: "108",
      villageCode: "556120",
      areaDeclaredHa: 2.15,
      areaCalculatedHa: 2.152,
      areaDeltaPercentage: 0.09,
      polygonValid: true,
      hasSelfIntersection: false,
      encroachmentDetected: false,
      overlapWithAdjacentParcel: false,
      coordinates: [
        [26.8493, 80.9468],
        [26.8501, 80.9515],
        [26.8465, 80.9508],
        [26.8460, 80.9461]
      ]
    },
    risk: {
      overallScore: 8,
      severity: "LOW",
      routingRecommendation: "AUTO_APPROVE_ELIGIBLE",
      factors: [
        {
          category: "Ownership & Share",
          scoreImpact: 0,
          severity: "LOW",
          ruleCode: "MH-MLRC-SEC-149",
          description: "Sole title holder verified with clean lineage and Mahabhulekh ledger sync.",
          remedyRecommendation: "Clear for instant Tehsildar digital sealing."
        },
        {
          category: "Cadastral & Area",
          scoreImpact: 4,
          severity: "LOW",
          ruleCode: "GIS-PARCEL-VERIFIED",
          description: "GeoJSON plot boundary coordinates match declared area within 0.09% variance.",
          remedyRecommendation: "No action needed."
        },
        {
          category: "Scan & OCR Quality",
          scoreImpact: 4,
          severity: "LOW",
          ruleCode: "OCR-HIGH-FIDELITY",
          description: "Exceptional scan clarity score 96/100, 98.4% mean field confidence.",
          remedyRecommendation: "No manual touch required."
        }
      ],
      canBeSealed: true
    },
    status: "READY_FOR_SEAL",
    createdAt: "2026-09-09T11:00:00Z",
    updatedAt: "2026-09-10T16:00:00Z"
  },
  {
    id: "DOC-MP-2026-003",
    documentTitle: "मध्य प्रदेश राजस्व मंडल — खसरा प्रपत्र बी-१ (ग्राम गौहरगंज) [विवादित / सीमा अतिक्रमण]",
    state: "Madhya Pradesh",
    district: "Raisen",
    tehsil: "Goharganj",
    village: "Goharganj",
    villageLgdCode: "482103",
    documentType: "MP B-1 Khasra Register",
    script: "Devanagari (Hindi)",
    scanImageUrl: "/assets/scans/mp_khasra_sample.svg",
    preprocessedImageUrl: "/assets/scans/mp_khasra_preprocessed.svg",
    cvDetails: {
      originalResolution: "1800 x 2600 (200 DPI - Degraded Scan)",
      deskewAngleDegrees: 3.25,
      binarizationMethod: "Otsu Adaptive Thresholding",
      contrastStretchGain: 2.10,
      denoiseFilter: "Non-Local Means (NLM)",
      clarityScore: 68,
      processingTimeMs: 560
    },
    khataNumber: {
      value: "78",
      confidence: 84,
      boundingBox: { ymin: 150, xmin: 140, ymax: 185, xmax: 260 },
      sourceTextSnippet: "खाता सं. : ७८"
    },
    khasraNumber: {
      value: "432/1",
      confidence: 88,
      boundingBox: { ymin: 190, xmin: 140, ymax: 225, xmax: 280 },
      sourceTextSnippet: "खसरा नं. : ४३२/१"
    },
    subDivision: {
      value: "१ (1)",
      confidence: 82,
      boundingBox: { ymin: 230, xmin: 140, ymax: 260, xmax: 240 },
      sourceTextSnippet: "उपखंड : १"
    },
    totalAreaHectare: {
      value: 3.85,
      confidence: 81,
      boundingBox: { ymin: 270, xmin: 140, ymax: 305, xmax: 330 },
      sourceTextSnippet: "रकबा : ३.८५ हे."
    },
    traditionalAreaUnit: {
      value: "15 Bigha 8 Biswa",
      confidence: 78,
      boundingBox: { ymin: 310, xmin: 140, ymax: 340, xmax: 380 },
      sourceTextSnippet: "१५ बीघा ८ बिस्वा"
    },
    landClassification: {
      value: "Agricultural (Barani)",
      confidence: 86,
      boundingBox: { ymin: 350, xmin: 140, ymax: 380, xmax: 420 },
      sourceTextSnippet: "भूमि वर्ग : असिंचित (बरानी)"
    },
    irrigationSource: {
      value: "Rainfed (Barani)",
      confidence: 88,
      boundingBox: { ymin: 390, xmin: 140, ymax: 420, xmax: 440 },
      sourceTextSnippet: "साधन : वर्षा आश्रित"
    },
    shareholders: [
      {
        id: "sh-mp-1",
        name: {
          value: "Kunwar Balwant Singh",
          confidence: 89,
          boundingBox: { ymin: 440, xmin: 120, ymax: 470, xmax: 350 },
          sourceTextSnippet: "कुंवर बलवंत सिंह"
        },
        fatherOrHusbandName: {
          value: "Thakur Jagannath Singh",
          confidence: 87,
          boundingBox: { ymin: 440, xmin: 360, ymax: 470, xmax: 580 },
          sourceTextSnippet: "पिता ठाकुर जगन्नाथ सिंह"
        },
        shareFraction: {
          value: "3/4",
          confidence: 88,
          boundingBox: { ymin: 440, xmin: 590, ymax: 470, xmax: 670 },
          sourceTextSnippet: "अंश ३/४ (७५%)"
        },
        sharePercentage: 75,
        aadhaarVaultRef: "VAULT-MP-8812-4401",
        status: "Living"
      },
      {
        id: "sh-mp-2",
        name: {
          value: "Dhirendra Pratap Singh",
          confidence: 84,
          boundingBox: { ymin: 480, xmin: 120, ymax: 510, xmax: 350 },
          sourceTextSnippet: "धीरेन्द्र प्रताप सिंह"
        },
        fatherOrHusbandName: {
          value: "Thakur Jagannath Singh",
          confidence: 85,
          boundingBox: { ymin: 480, xmin: 360, ymax: 510, xmax: 580 },
          sourceTextSnippet: "पिता ठाकुर जगन्नाथ सिंह"
        },
        shareFraction: {
          value: "2/5", // 40%! Total = 75% + 40% = 115% mathematically invalid!
          confidence: 83,
          boundingBox: { ymin: 480, xmin: 590, ymax: 510, xmax: 670 },
          sourceTextSnippet: "अंश २/५ (४०%) [त्रुटिपूर्ण]"
        },
        sharePercentage: 40,
        aadhaarVaultRef: "VAULT-MP-3319-7721",
        status: "Disputed"
      }
    ],
    totalSharePercentage: 115, // Flagged!
    isShareBalanced: false,
    mutations: [
      {
        mutationNumber: {
          value: "ना.क्र. १८/२०२४",
          confidence: 85,
          boundingBox: { ymin: 560, xmin: 120, ymax: 590, xmax: 290 },
          sourceTextSnippet: "ना.क्र. १८/२०२४"
        },
        mutationDate: {
          value: "05/02/2024",
          confidence: 82,
          boundingBox: { ymin: 560, xmin: 300, ymax: 590, xmax: 440 },
          sourceTextSnippet: "दिनांक ०५/०२/२०२४"
        },
        transferType: {
          value: "Partition",
          confidence: 86,
          boundingBox: { ymin: 560, xmin: 450, ymax: 590, xmax: 610 },
          sourceTextSnippet: "बंटवारा (धारा १७८)"
        },
        predecessorName: {
          value: "Thakur Jagannath Singh (Deceased)",
          confidence: 84,
          boundingBox: { ymin: 600, xmin: 120, ymax: 630, xmax: 380 },
          sourceTextSnippet: "मृतक जगन्नाथ सिंह"
        },
        successorName: {
          value: "Balwant Singh & Dhirendra Singh",
          confidence: 86,
          boundingBox: { ymin: 600, xmin: 390, ymax: 630, xmax: 620 },
          sourceTextSnippet: "वारिस बलवंत व धीरेन्द्र"
        },
        orderAuthority: {
          value: "Tehsildar Goharganj (Stayed by Sub-Divisional Officer)",
          confidence: 83,
          boundingBox: { ymin: 640, xmin: 120, ymax: 670, xmax: 520 },
          sourceTextSnippet: "एसडीएम न्यायालय में स्थगन विचाराधीन"
        },
        status: "Disputed"
      }
    ],
    encumbrances: [
      {
        bankOrCourt: "Civil Court Raisen (Case No. 44/2024 - Partition Suit)",
        amount: 0,
        type: "Court Stay Order",
        dateRecorded: "2024-03-01",
        cleared: false
      }
    ],
    lrmsCheck: {
      lrmsRecordFound: true,
      lrmsKhasra: "432/1",
      lrmsKhata: "78",
      lrmsTotalAreaHectares: 3.20,
      lrmsOwners: ["Kunwar Balwant Singh", "Dhirendra Pratap Singh"],
      lrmsMutationsCount: 1,
      discrepancies: [
        {
          field: "totalSharePercentage",
          extractedValue: "115% (3/4 + 2/5)",
          lrmsValue: "100%",
          severity: "CRITICAL",
          message: "Sum of recorded shareholder quotas exceeds 100% (1.15). Over-allocation defect detected."
        },
        {
          field: "totalAreaHectare",
          extractedValue: 3.85,
          lrmsValue: 3.20,
          severity: "HIGH",
          message: "Area inflation detected (+0.65 Ha / +20.3%). Scanned document claims 3.85 Ha vs 3.20 Ha in record."
        },
        {
          field: "encumbrance",
          extractedValue: "Court Stay Order active",
          lrmsValue: "Injunction recorded",
          severity: "CRITICAL",
          message: "Active civil court stay order on Khasra 432/1 under Section 178 MP Land Revenue Code."
        }
      ],
      isLrmsSynced: false,
      lastLrmsUpdate: "2024-02-15T10:00:00Z"
    },
    cadastralGeometry: {
      khasraNumber: "432/1",
      villageCode: "482103",
      areaDeclaredHa: 3.85,
      areaCalculatedHa: 3.48,
      areaDeltaPercentage: 9.6,
      polygonValid: false, // Invalid polygon / overlap!
      hasSelfIntersection: false,
      encroachmentDetected: true,
      encroachmentType: "Gram Sabha Pasture",
      overlapWithAdjacentParcel: true,
      overlappingKhasra: "GS-01",
      coordinates: [
        [26.8450, 80.9415],
        [26.8456, 80.9458],
        [26.8415, 80.9452],
        [26.8410, 80.9408]
      ]
    },
    risk: {
      overallScore: 89,
      severity: "CRITICAL",
      routingRecommendation: "BLOCKED_FRAUD_SUSPECT",
      factors: [
        {
          category: "Ownership & Share",
          scoreImpact: 35,
          severity: "CRITICAL",
          ruleCode: "MP-LRC-SEC-178-ERR",
          description: "Sum of shareholder shares = 115% (3/4 + 2/5 = 1.15). Contested partition and share inflation detected.",
          remedyRecommendation: "Revenue Court partition decree review required. Must be rectified to 1.0 (100%)."
        },
        {
          category: "Cadastral & Area",
          scoreImpact: 32,
          severity: "CRITICAL",
          ruleCode: "GIS-ENCROACHMENT-PUB",
          description: "Polygon overlaps into Gram Sabha Charagah pasture parcel (GS-01) by 0.38 Ha.",
          remedyRecommendation: "Immediate demarcation survey by Revenue Inspector. Digital sealing strictly blocked."
        },
        {
          category: "Mutation & Title Chain",
          scoreImpact: 22,
          severity: "CRITICAL",
          ruleCode: "COURT-STAY-ACTIVE",
          description: "Civil Court stay order in Civil Suit No. 44/2024 pending hearing.",
          remedyRecommendation: "No land digitization approval permitted during pendency of judicial injunction."
        }
      ],
      canBeSealed: false,
      blockReason: "CRITICAL RISK: Over-allocated shares (115%), Gram Sabha public land encroachment, and active court injunction."
    },
    status: "DISPUTED_REJECTED",
    createdAt: "2026-09-07T14:20:00Z",
    updatedAt: "2026-09-10T12:00:00Z"
  },
  {
    id: "DOC-PB-2026-004",
    documentTitle: "Department of Revenue & Rehabilitation — Jamabandi Register (RoR) Tehsil Nabha",
    state: "Punjab",
    district: "Patiala",
    tehsil: "Nabha",
    village: "Alhoran",
    villageLgdCode: "389201",
    documentType: "Punjab Jamabandi (RoR)",
    script: "Gurmukhi (Punjabi)",
    scanImageUrl: "/assets/scans/pb_jamabandi_sample.svg",
    preprocessedImageUrl: "/assets/scans/pb_jamabandi_preprocessed.svg",
    cvDetails: {
      originalResolution: "2400 x 3200 (300 DPI)",
      deskewAngleDegrees: 1.12,
      binarizationMethod: "Otsu Adaptive Thresholding",
      contrastStretchGain: 1.75,
      denoiseFilter: "Non-Local Means (NLM)",
      clarityScore: 92,
      processingTimeMs: 410
    },
    khataNumber: {
      value: "56/112",
      confidence: 96,
      boundingBox: { ymin: 140, xmin: 150, ymax: 175, xmax: 290 },
      sourceTextSnippet: "ਖੇਵਟ/ਖਤੌਨੀ : ੫੬/੧੧੨"
    },
    khasraNumber: {
      value: "34//12",
      confidence: 95,
      boundingBox: { ymin: 180, xmin: 150, ymax: 215, xmax: 280 },
      sourceTextSnippet: "ਮੁਰੱਬਾ/ਕਿੱਲਾ ਨੰ : ੩੪//੧੨"
    },
    subDivision: {
      value: "Min",
      confidence: 93,
      boundingBox: { ymin: 220, xmin: 150, ymax: 250, xmax: 240 },
      sourceTextSnippet: "ਮਿਨ"
    },
    totalAreaHectare: {
      value: 1.82,
      confidence: 94,
      boundingBox: { ymin: 260, xmin: 150, ymax: 295, xmax: 320 },
      sourceTextSnippet: "ਰਕਬਾ : ੧.੮੨ ਹੈਕ."
    },
    traditionalAreaUnit: {
      value: "4 Killa 2 Kanal",
      confidence: 91,
      boundingBox: { ymin: 300, xmin: 150, ymax: 330, xmax: 370 },
      sourceTextSnippet: "੪ ਕਿੱਲੇ ੨ ਕਨਾਲ"
    },
    landClassification: {
      value: "Agricultural (Chahi)",
      confidence: 95,
      boundingBox: { ymin: 340, xmin: 150, ymax: 370, xmax: 420 },
      sourceTextSnippet: "ਕਿਸਮ ਜ਼ਮੀਨ : ਨਹਿਰੀ/ਚਾਹੀ"
    },
    irrigationSource: {
      value: "Canal Water (Bhakra Main Line) + Tube Well",
      confidence: 93,
      boundingBox: { ymin: 380, xmin: 150, ymax: 410, xmax: 470 },
      sourceTextSnippet: "ਸਾਧਨ : ਨਹਿਰ + ਟਿਊਬਵੈਲ"
    },
    shareholders: [
      {
        id: "sh-pb-1",
        name: {
          value: "Gurdeep Singh",
          confidence: 96,
          boundingBox: { ymin: 440, xmin: 130, ymax: 470, xmax: 370 },
          sourceTextSnippet: "ਗੁਰਦੀਪ ਸਿੰਘ"
        },
        fatherOrHusbandName: {
          value: "Harbhajan Singh",
          confidence: 95,
          boundingBox: { ymin: 440, xmin: 380, ymax: 470, xmax: 600 },
          sourceTextSnippet: "ਪਿਤਾ ਹਰਭਜਨ ਸਿੰਘ"
        },
        shareFraction: {
          value: "1/2",
          confidence: 98,
          boundingBox: { ymin: 440, xmin: 610, ymax: 470, xmax: 690 },
          sourceTextSnippet: "ਹਿੱਸਾ ੧/੨"
        },
        sharePercentage: 50,
        aadhaarVaultRef: "VAULT-PB-5521-8819",
        status: "Living"
      },
      {
        id: "sh-pb-2",
        name: {
          value: "Balwinder Kaur",
          confidence: 95,
          boundingBox: { ymin: 480, xmin: 130, ymax: 510, xmax: 370 },
          sourceTextSnippet: "ਬਲਵਿੰਦਰ ਕੌਰ"
        },
        fatherOrHusbandName: {
          value: "Gurdeep Singh",
          confidence: 94,
          boundingBox: { ymin: 480, xmin: 380, ymax: 510, xmax: 600 },
          sourceTextSnippet: "ਪਤੀ ਗੁਰਦੀਪ ਸਿੰਘ"
        },
        shareFraction: {
          value: "1/2",
          confidence: 97,
          boundingBox: { ymin: 480, xmin: 610, ymax: 510, xmax: 690 },
          sourceTextSnippet: "ਹਿੱਸਾ ੧/੨"
        },
        sharePercentage: 50,
        aadhaarVaultRef: "VAULT-PB-1109-6632",
        status: "Living"
      }
    ],
    totalSharePercentage: 100,
    isShareBalanced: true,
    mutations: [
      {
        mutationNumber: {
          value: "ਇੰਤਕਾਲ ਨੰ. ੮੯੨",
          confidence: 96,
          boundingBox: { ymin: 550, xmin: 120, ymax: 580, xmax: 310 },
          sourceTextSnippet: "ਇੰਤਕਾਲ ਨੰ. ੮੯੨"
        },
        mutationDate: {
          value: "19/08/2021",
          confidence: 93,
          boundingBox: { ymin: 550, xmin: 320, ymax: 580, xmax: 460 },
          sourceTextSnippet: "ਮਿਤੀ ੧੯/੦੮/੨੦੨੧"
        },
        transferType: {
          value: "Sale Deed (Bainama)",
          confidence: 95,
          boundingBox: { ymin: 550, xmin: 470, ymax: 580, xmax: 650 },
          sourceTextSnippet: "ਬੈਨਾਮਾ ਰਜਿਸਟਰੀ"
        },
        predecessorName: {
          value: "Jarnail Singh s/o Mohan Singh",
          confidence: 94,
          boundingBox: { ymin: 590, xmin: 120, ymax: 620, xmax: 380 },
          sourceTextSnippet: "ਵਿਕ੍ਰੇਤਾ ਜਰਨੈਲ ਸਿੰਘ"
        },
        successorName: {
          value: "Gurdeep Singh & Balwinder Kaur",
          confidence: 95,
          boundingBox: { ymin: 590, xmin: 390, ymax: 620, xmax: 650 },
          sourceTextSnippet: "ਖਰੀਦਦਾਰ ਗੁਰਦੀਪ ਸਿੰਘ ਆਦਿ"
        },
        orderAuthority: {
          value: "Circle Revenue Officer (Tehsildar), Nabha",
          confidence: 94,
          boundingBox: { ymin: 630, xmin: 120, ymax: 660, xmax: 510 },
          sourceTextSnippet: "ਤਸਦੀਕ ਕਰਤਾ: ਤਹਿਸੀਲਦਾਰ ਨਾਭਾ"
        },
        status: "Sanctioned"
      }
    ],
    encumbrances: [],
    lrmsCheck: {
      lrmsRecordFound: true,
      lrmsKhasra: "34//12",
      lrmsKhata: "56/112",
      lrmsTotalAreaHectares: 1.82,
      lrmsOwners: ["Gurdeep Singh", "Balwinder Kaur"],
      lrmsMutationsCount: 1,
      discrepancies: [],
      isLrmsSynced: true,
      lastLrmsUpdate: "2024-03-20T09:15:00Z"
    },
    cadastralGeometry: {
      khasraNumber: "34//12",
      villageCode: "389201",
      areaDeclaredHa: 1.82,
      areaCalculatedHa: 1.818,
      areaDeltaPercentage: 0.11,
      polygonValid: true,
      hasSelfIntersection: false,
      encroachmentDetected: false,
      overlapWithAdjacentParcel: false,
      coordinates: [
        [26.8415, 80.9450],
        [26.8422, 80.9490],
        [26.8390, 80.9485],
        [26.8385, 80.9445]
      ]
    },
    risk: {
      overallScore: 16,
      severity: "LOW",
      routingRecommendation: "AUTO_APPROVE_ELIGIBLE",
      factors: [
        {
          category: "Ownership & Share",
          scoreImpact: 0,
          severity: "LOW",
          ruleCode: "PB-ROR-SHARE-OK",
          description: "Joint husband & wife 50%-50% title validated without dispute.",
          remedyRecommendation: "Ready for sealing."
        },
        {
          category: "Cadastral & Area",
          scoreImpact: 8,
          severity: "LOW",
          ruleCode: "GIS-BOUNDARY-CONGRUENT",
          description: "Cadastral boundaries match RoR area within 0.11%.",
          remedyRecommendation: "None."
        },
        {
          category: "Scan & OCR Quality",
          scoreImpact: 8,
          severity: "LOW",
          ruleCode: "GURMUKHI-OCR-CLEAN",
          description: "Gurmukhi OCR confidence 94.2%. Clear typography.",
          remedyRecommendation: "None."
        }
      ],
      canBeSealed: true
    },
    status: "READY_FOR_SEAL",
    createdAt: "2026-09-08T10:00:00Z",
    updatedAt: "2026-09-10T15:30:00Z"
  }
];

export const INITIAL_AUDIT_LOG = [
  {
    index: 1,
    timestamp: "2026-09-08T09:30:15Z",
    documentId: "DOC-UP-2026-001",
    khasraNumber: "214/2",
    eventType: "INGESTION" as const,
    officerEmail: "operator@bhudrishti.gov.in",
    officerRole: "Data Entry Operator" as const,
    details: "High-resolution scanned Form CH-41 ingested with CV adaptive binarization & deskew (+1.42 deg).",
    previousHash: "0000000000000000000000000000000000000000000000000000000000000000",
    currentHash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069"
  },
  {
    index: 2,
    timestamp: "2026-09-08T09:31:02Z",
    documentId: "DOC-UP-2026-001",
    khasraNumber: "214/2",
    eventType: "OCR_EXTRACTED" as const,
    officerEmail: "system.vlm@bhudrishti.gov.in",
    officerRole: "DILRMP Admin" as const,
    details: "Multimodal OCR & Domain NER completed. 14 entities extracted. Mean confidence 95.1%.",
    previousHash: "7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
    currentHash: "9a01f78e472cb33568c7e923e200f80bb14a7061d4a89d1369cf12fb2778bb11"
  },
  {
    index: 3,
    timestamp: "2026-09-09T14:10:45Z",
    documentId: "DOC-UP-2026-001",
    khasraNumber: "214/2",
    eventType: "GIS_VERIFIED" as const,
    officerEmail: "patwari@bhudrishti.gov.in",
    officerRole: "Patwari / Talathi" as const,
    details: "Cadastral GeoJSON overlay verified against Village Rampur Kalan map. Area delta flagged (+0.175 Ha).",
    previousHash: "9a01f78e472cb33568c7e923e200f80bb14a7061d4a89d1369cf12fb2778bb11",
    currentHash: "3e5c92ba187f54c93540a83e0a169b12d59f3d994e77221805ebad2e76f551b9"
  },
  {
    index: 4,
    timestamp: "2026-09-09T11:05:20Z",
    documentId: "DOC-MH-2026-002",
    khasraNumber: "108",
    eventType: "INGESTION" as const,
    officerEmail: "operator@bhudrishti.gov.in",
    officerRole: "Data Entry Operator" as const,
    details: "Maharashtra 7/12 scan ingested. Sauvola local thresholding applied.",
    previousHash: "3e5c92ba187f54c93540a83e0a169b12d59f3d994e77221805ebad2e76f551b9",
    currentHash: "b2110c4f87da6a117b38c279e0a0d99ef521894aa71239c0e7b8f990117ec822"
  },
  {
    index: 5,
    timestamp: "2026-09-09T11:06:10Z",
    documentId: "DOC-MH-2026-002",
    khasraNumber: "108",
    eventType: "LRMS_RECONCILED" as const,
    officerEmail: "patwari@bhudrishti.gov.in",
    officerRole: "Patwari / Talathi" as const,
    details: "Reconciled with Mahabhulekh API mock adapter. 0 discrepancies found.",
    previousHash: "b2110c4f87da6a117b38c279e0a0d99ef521894aa71239c0e7b8f990117ec822",
    currentHash: "e5a7b801264c119934ffbc0209ab31e847c191a2745e1199cb4431e78019af24"
  }
];

export const INITIAL_LEARNING_QUEUE = [
  {
    id: "LQ-2026-01",
    documentId: "DOC-UP-2026-001",
    fieldName: "traditionalAreaUnit",
    khasraNumber: "214/2",
    aiPredictedValue: "3 Bigha 8 Biswa",
    aiConfidence: 89,
    humanCorrectedValue: "3 Bigha 8.5 Biswa",
    correctedByOfficer: "patwari@bhudrishti.gov.in",
    timestamp: "2026-09-09T14:15:00Z",
    verified: true
  },
  {
    id: "LQ-2026-02",
    documentId: "DOC-PB-2026-004",
    fieldName: "irrigationSource",
    khasraNumber: "34//12",
    aiPredictedValue: "Canal Water + Tube Well",
    aiConfidence: 93,
    humanCorrectedValue: "Canal Water (Bhakra Main Line) + Solar Tube Well",
    correctedByOfficer: "patwari@bhudrishti.gov.in",
    timestamp: "2026-09-10T11:20:00Z",
    verified: true
  }
];
