import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'server', 'data');
const OUT_FILE = path.join(DATA_DIR, 'question-bank.json');

// Ensure output directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Load existing progress
let questionBank: Record<string, any[]> = {};
if (fs.existsSync(OUT_FILE)) {
  try {
    questionBank = JSON.parse(fs.readFileSync(OUT_FILE, 'utf-8'));
    console.log(`Loaded ${Object.keys(questionBank).length} existing categories from ${OUT_FILE}`);
  } catch (err) {
    console.warn("Could not parse existing output file, starting fresh.");
  }
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const categories = [
  {
    key: "math-sets",
    title: "Sets, Relations, and Functions",
    desc: "Set theory, operations, union/intersection, subset cardinalities, Cartesian product, relations (reflexive, symmetric, transitive), equivalence relations, functions (injective, surjective, bijective), and compositions."
  },
  {
    key: "math-numbers",
    title: "Basic Algebra and Sequences",
    desc: "Arithmetic Progressions (AP), Geometric Progressions (GP), sum to infinity, real numbers, decimal expansions, prime factorizations, modular arithmetic."
  },
  {
    key: "math-algebra",
    title: "General Algebra & Polynomials",
    desc: "Quadratic equations, roots and coefficients, Vieta's formulas, remainder and factor theorems, Descartes' Rule of Signs, binomial expansions, sequences and series."
  },
  {
    key: "math-matrix",
    title: "Matrices and Determinants",
    desc: "Determinant evaluations, adjoint and inverse of matrices, ranks of matrices, systems of linear equations, Cramer's Rule, Gaussian elimination, consistency criteria."
  },
  {
    key: "math-complex",
    title: "Complex Numbers",
    desc: "Complex algebra, conjugate, modulus, polar form, Euler's form, De Moivre's Theorem, complex cube roots of unity, nth roots of unity."
  },
  {
    key: "math-equations",
    title: "Theory of Equations",
    desc: "Vieta's relations, Descartes' Rule of Signs, complex conjugate roots theorem, polynomial roots multiplicity, fundamental theorem of algebra, ordinary differential equations."
  },
  {
    key: "math-geometry",
    title: "Analytical Geometry & Vectors",
    desc: "Centroids, line equations, perpendicular distances, conics (parabola, ellipse, hyperbola), eccentricity, tangent and normal equations, vector dot and cross products, scalar and vector triple products, equations of lines and planes in 3D."
  },
  {
    key: "math-trig",
    title: "Trigonometry and Inverse Trig",
    desc: "Fundamental identities, Sine and Cosine rules, compound angles, double angles, inverse trigonometric functions (domain, range, principal values, identities)."
  },
  {
    key: "math-calculus",
    title: "Differential and Integral Calculus",
    desc: "Derivatives, power rule, chain rule, geometric interpretation, local extrema, limits and continuity, Rolle's and Lagrange's mean value theorems, partial derivatives, Euler's theorem on homogeneous functions, definite and indefinite integrals."
  },
  {
    key: "math-combinatorics",
    title: "Combinatorics and Induction",
    desc: "Permutations, combinations, relations between nPr and nCr, factorial notations, Principle of Mathematical Induction, counting principles."
  },
  {
    key: "math-stats",
    title: "Statistics and Probability",
    desc: "Median, mean, mode, standard deviation, probability axioms, complementary events, independent events, conditional probability, probability distributions, mensuration."
  },
  {
    key: "science-physics-electro",
    title: "Electricity and Magnetism",
    desc: "Coulomb's Law, electric field and potential, Gauss's Law, capacitance, capacitors in series/parallel, Ohm's Law, resistivity, Kirchhoff's Laws, electromagnetic induction, Faraday's Laws, Lenz's Law, Ampere's Law."
  },
  {
    key: "science-physics-optics",
    title: "Optics and Wave Physics",
    desc: "Reflection, refraction, plane and curved mirrors, focal length, Snell's Law, prisms, lenses, myopia/hypermetropia correction, interference, diffraction, polarization, sound waves, speed of sound."
  },
  {
    key: "science-physics-motion",
    title: "Mechanics and Laws of Motion",
    desc: "Newton's Laws of Motion, force, acceleration, inertia, linear momentum, conservation laws, projectile motion, acceleration due to gravity, satellites, escape velocity, elasticity, fluid mechanics, work, power, and energy."
  },
  {
    key: "science-chemistry-metallurgy",
    title: "Metallurgy and Metal Extraction",
    desc: "Concentration of ores (froth flotation, gravity separation, leaching), roasting, calcination, smelting, refining of metals, extraction of iron from haematite, flux and slag, electrolytic refining."
  },
  {
    key: "science-chemistry-bonding",
    title: "Inorganic Chemistry & Bonding",
    desc: "VSEPR theory, hybridization, molecular geometry, ionic and covalent bonding, coordinate bonds, noble gases, p-block elements groups, valence configurations."
  },
  {
    key: "science-chemistry-organic",
    title: "Organic Chemistry and Biomolecules",
    desc: "Alkanes, alkenes, alkynes, IUPAC nomenclature, functional groups (alcohols, carboxylic acids, aldehydes), hydrocarbons, haloalkanes/haloarenes, DNA, RNA, proteins, carbohydrates."
  },
  {
    key: "science-chemistry-physical",
    title: "Physical Chemistry",
    desc: "Nernst equation, pH calculation, Le Chatelier's principle, equilibrium constants, rate of reactions, order of reaction, rate constant units, thermodynamics, solutions, colligative properties."
  },
  {
    key: "science-biology-genetics",
    title: "Genetics and Evolution",
    desc: "Mendelian genetics, monohybrid/dihybrid crosses, F2 ratios, DNA replication, transcription, translation, Darwin's theory of evolution, natural selection, sex determination (XX, XY, etc.)."
  },
  {
    key: "science-biology-cell",
    title: "Cell Biology and Plant Anatomy",
    desc: "Mitochondria, nucleus, ribosomes, chloroplasts, ATP synthesis, prokaryotes vs eukaryotes, meristematic tissues, parenchyma, sclerenchyma, xylem/phloem transport."
  },
  {
    key: "science-biology-health",
    title: "Human Health and Diseases",
    desc: "Infectious diseases (viral, bacterial, protozoan), white blood cells, immune system, leukocytes, platelets, erythrocytes, vaccines, non-infectious metabolic disorders."
  },
  {
    key: "science-biology-ecology",
    title: "Ecology and Environmental Science",
    desc: "Ecosystems, biotic and abiotic factors, trophic levels, food chains, producers, consumers, decomposers, biodiversity conservation, natural resource management."
  }
];

const missingCategories = categories.filter(c => !questionBank[c.key] || questionBank[c.key].length < 15);
console.log(`Remaining categories to generate: ${missingCategories.length}`);

async function generateWithPollinations(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds timeout

  try {
    const response = await fetch("https://text.pollinations.ai/?model=openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: "You are an expert school textbook quiz generator. Output ONLY a valid JSON array of exactly 15 multiple-choice questions for the requested topic. Do not wrap in markdown code blocks like ```json. Do not include any conversational filler text. Return the raw JSON array string."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      }),
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`Pollinations AI error: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function generateCategoryQuestions(cat: typeof categories[0]): Promise<any[]> {
  const prompt = `
Generate exactly 15 academic multiple-choice questions for the following subject category:
Category: ${cat.title}
Topics Covered: ${cat.desc}

Return a JSON array containing exactly 15 question objects. Do not wrap in markdown code blocks. The response must be a valid JSON array directly.
Each object MUST have this structure:
{
  "question": "The text of the question (must be high-quality, academic, challenging, and strictly relevant to the topics covered)",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswerIndex": 0, // 0, 1, 2, or 3 representing the index of the correct option
  "explanation": "Detailed, educational explanation explaining why this answer is correct."
}
`;

  let lastError: any = null;
  let retries = 4;
  let delay = 5000;
  
  while (retries > 0) {
    try {
      const text = await generateWithPollinations(prompt);
      let cleanedText = text.trim();
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "");
      }
      
      const parsed = JSON.parse(cleanedText);
      if (Array.isArray(parsed) && parsed.length === 15) {
        const isValid = parsed.every(q => 
          typeof q.question === 'string' &&
          Array.isArray(q.options) &&
          q.options.length === 4 &&
          typeof q.correctAnswerIndex === 'number' &&
          q.correctAnswerIndex >= 0 &&
          q.correctAnswerIndex <= 3 &&
          typeof q.explanation === 'string'
        );
        if (isValid) {
          return parsed;
        }
      }
      console.warn(`[${cat.key}] Response did not yield exactly 15 valid questions. Retrying...`);
    } catch (err: any) {
      lastError = err;
      console.warn(`[${cat.key}] Error: ${err.message || err}. Retrying in ${delay / 1000}s...`);
      await sleep(delay);
      delay *= 1.5;
    }
    retries--;
  }

  throw lastError || new Error(`Failed to generate questions for ${cat.key}`);
}

async function run() {
  let successCount = 0;
  
  for (let i = 0; i < missingCategories.length; i++) {
    const cat = missingCategories[i];
    console.log(`\n[${i + 1}/${missingCategories.length}] Generating questions for: ${cat.title} (${cat.key})`);
    
    let success = false;
    let attempts = 0;
    while (!success && attempts < 3) {
      try {
        attempts++;
        const questions = await generateCategoryQuestions(cat);
        questionBank[cat.key] = questions;
        
        // Write to file progressively
        fs.writeFileSync(OUT_FILE, JSON.stringify(questionBank, null, 2));
        console.log(`✅ Successfully saved category: ${cat.key}`);
        success = true;
        successCount++;
      } catch (err: any) {
        console.error(`❌ Failed to generate for: ${cat.key} on attempt ${attempts}. Error: ${err.message}`);
        if (attempts < 3) {
          console.log("Waiting 10s before next attempt...");
          await sleep(10000);
        }
      }
    }
    
    // Add delay between categories to prevent IP limits
    await sleep(4000);
  }
  
  console.log(`\n🎉 Completed! Generated ${successCount} new categories.`);
}

run().catch(console.error);
