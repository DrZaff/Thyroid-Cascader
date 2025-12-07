// Thyroid Cascader – script.js
// All clinical content here is placeholder; replace with your own decision trees.

document.addEventListener("DOMContentLoaded", () => {
  initThyroidCascader();
});

// ---------- Decision Tree Definitions ----------

// NOTE: Replace these placeholder trees with your full hypo / hyper / nodule
// algorithms. Each node represents one full-screen decision or outcome.

const decisionTrees = {
  hypo: {
    title: "Hypothyroid cascade",
    rootId: "h1",
    nodes: {
      h1: {
        id: "h1",
        type: "question",
        text: "Obtain TSH.",
        note: "Use an assay not affected by supplements such as high-dose biotin.",
        options: [
          { label: "TSH elevated", next: "h2" },
          { label: "TSH normal", next: "h3" },
          { label: "TSH low", next: "h4" }
        ]
      },
      h2: {
        id: "h2",
        type: "question",
        text: "Repeat TSH (confirm elevation) and get FT4.",
        options: [
          { label: "FT4 low", next: "h2_out_primary" },
          { label: "FT4 normal", next: "h2_out_subclinical" },
          { label: "FT4 high", next: "h2_out_other" }
        ]
      },
      h2_out_primary: {
        id: "h2_out_primary",
        type: "outcome",
        text: "Pattern consistent with primary hypothyroidism.",
        note: "Low FT4 and low-high TSH (5-10 mU/L) can rarely also be central - correlate clinically."
      },
      h2_out_subclinical: {
        id: "h2_out_subclinical",
        type: "outcome",
        text: "Pattern consistent with subclinical hypothyroidism.",
        note: "Repeat TSH and FT4 in 1-3 months to confirm diagnosis."
      },
      h2_out_other: {
        id: "h2_out_other",
        type: "outcome",
        text: "Uncommon pattern: elevated TSH with high FT4.",
        note: "Consider assay interference, thyroid hormone resistance, amiodarone or a TSH-secreting pituitary adenoma."
      },
      h3: {
        id: "h3",
        type: "question",
        text: "Are there strong clinical hypothyroid features or pituitary disease?",
        options: [
          { label: "Yes – strong symptoms or pituitary disease", next: "h3_next" },
          { label: "No – limited symptoms", next: "h3_out_unlikely" }
        ]
      },
      h3_next: {
        id: "h3_next",
        type: "question",
        text: "Obtain FT4 (and repeat TSH to confirm normal).",
        options: [
          { label: "Free T4 LLN/low", next: "h3_out_central" },
          { label: "Free T4 normal", next: "h3_out_unlikely" },
          { label: "Free T4 elevated", next: "h2_out_other" }
        ]
      },
      h3_out_central: {
        id: "h3_out_central",
        type: "outcome",
        text: "Pattern suggests possible central hypothyroidism.",
        note: "Also rule out nonthyroid illness."
      },
      h3_out_unlikely: {
        id: "h3_out_unlikely",
        type: "outcome",
        text: "Biochemical pattern does not support hypothyroidism.",
        note: "Consider alternative explanations for symptoms."
      },
      h4: {
        id: "h4",
        type: "question",
        text: "Repeat TSH (confirm low), FT4, total T3.",
        options: [
          { label: "Normal or elevated", next: "h4_biotin" },
          { label: "LLN or low", next: "h3_out_central" }
        ]
      },
      h4_biotin: {
        id: "h4_biotin",
        type: "question",
        text: "Is the patient taking biotin in doses of 5–10 mg daily or higher?",
        options: [
          { label: "Yes", next: "h4_out_biotinINT" },
          { label: "No", next: "h4_out_hyperthyroid" }
        ]
      },
      h4_out_biotinINT: {
        id: "h4_out_biotinINT",
        type: "outcome",
        text: "Possible biotin assay interference.",
        note: "Repeat labs after discontinuing biotin for 2–3 days."
      },
      h4_out_hyperthyroid: {
        id: "h4_out_hyperthyroid",
        type: "outcome",
        text: "Hyperthyroid (overt or subclinical) likely.",
        note: "Go to hyperthyroid pathway."
      }
    }
  },

  hyper: {
    title: "Hyperthyroid cascade",
    rootId: "hy1",
    nodes: {
      hy1: {
        id: "hy1",
        type: "question",
        text: "Obtain TSH with FT4 and T3.",
        note: "In stable patients using high-dose biotin, testing may need to be repeated off biotin for 2–3 days.",
        options: [
          { label: "TSH low", next: "hy1_low" },
          { label: "TSH normal or high", next: "hy1_next" }
        ]
      },
      hy1_low: {
        id: "hy1_low",
        type: "question",
        text: "What are FT4 and T3?",
        note: "In stable patients using high-dose biotin, testing may need to be repeated off biotin for 2–3 days.",
        options: [
          { label: "FT4 and/or T3 high", next: "hy1_out_overt" },
          { label: "FT4 and T3 normal", next: "hy1_out_subclinical" },
          { label: "FT4 and/or T3 low", next: "hy1_out_other" }
        ]
      },
      hy1_out_overt: {
        id: "hy1_out_overt",
        type: "outcome",
        text: "Pattern consistent with overt hyperthyroidism.",
        note: "Next steps typically involve determining etiology and urgency of treatment."
      },
      hy1_out_subclinical: {
        id: "hy1_out_subclinical",
        type: "outcome",
        text: "Pattern consistent with subclinical hyperthyroidism.",
        note: "Management depends on age, TSH suppression degree, and comorbidities."
      },
      hy1_out_other: {
        id: "hy1_out_other",
        type: "outcome",
        text: "Broad differential.",
        note: "Consider non-thyroidal illness, high-dose glucocorticoids, recovery phase after thyrotoxicosis, or central hypothyroidism."
      },
      hy1_next: {
        id: "hy1_next",
        type: "question",
        text: "What are free T4 and T3?",
        options: [
          { label: "Free T4 and/or T3 high", next: "hy1_out_tshmediated" },
          { label: "Free T4 and T3 not elevated", next: "hy1_out_excluded" }
        ]
      },
      hy1_out_tshmediated: {
        id: "hy1_out_tshmediated",
        type: "outcome",
        text: "Consider TSH-mediated hyperthyroidism (rare).",
        note: "Specialist evaluation and pituitary imaging may be indicated per local protocols."
      },
      hy1_out_excluded: {
        id: "hy1_out_excluded",
        type: "outcome",
        text: "Biochemical pattern does not support hyperthyroidism.",
        note: "Hyperthyroidism is unlikely based on these labs."
      }
    }
  },

  nodule: {
    title: "Thyroid nodule cascade",
    rootId: "n1",
    nodes: {
      n1: {
        id: "n1",
        type: "question",
        text: "Obtain TSH and ultrasound.",
        options: [
          { label: "TSH normal or high", next: "n2" },
          { label: "TSH low", next: "n3" }
        ]
      },
      n2: {
        id: "n2",
        type: "question",
        text: "Do sonographic features meet your institution’s criteria for FNA?",
        options: [
          { label: "Meets FNA criteria", next: "n2_out_fna" },
          { label: "Does not meet FNA criteria", next: "n2_out_monitor" }
        ]
      },
      n2_out_fna: {
        id: "n2_out_fna",
        type: "outcome",
        text: "Nodule suitable for fine-needle aspiration under ultrasound guidance.",
        note: "Follow local cytology and follow-up recommendations."
      },
      n2_out_monitor: {
        id: "n2_out_monitor",
        type: "outcome",
        text: "Nodule does not currently meet sonographic criteria for biopsy.",
        note: "Consider periodic sonographic surveillance per guidelines (6–24 month re-eval)."
      },
      n3: {
        id: "n3",
        type: "question",
        text: "Obtain FT4, T3, and radionuclide scan.",
        options: [
          { label: "Nodule functioning ('hot')", next: "n3_Hormones" },
          { label: "Nodule nonfunctioning", next: "n3_out_subclinical" }
        ]
      },
      n3_Hormones: {
        id: "n3_Hormones",
        type: "question",
        text: "What are FT4 and T3 levels?",
        options: [
          { label: "FT4 and/or T3 high", next: "n3_out_hot" },
          { label: "FT4 and T3 normal", next: "n3_out_subclinical" }
        ]
      },
      n3_out_hot: {
        id: "n3_out_hot",
        type: "outcome",
        text: "Overt hyperthyroidism.",
        note: "Initiate treatment."
      },
      n3_out_subclinical: {
        id: "n3_out_subclinical",
        type: "outcome",
        text: "Subclinical hyperthyroid.",
        note: "Requires individualized assessment, often combining ultrasound risk features and biochemical findings."
      }
    }
  }
};

// ---------- Thyroid Lab Interpretation (Home Screen Box) ----------

// Etiology lists derived from the reference table.
const THYROID_ETIOLOGIES = {
  primaryHypo: [
    "Hashimoto thyroiditis (most common cause).",
    "Iatrogenic (e.g., following thyroidectomy or radioiodine therapy).",
    "Antithyroid medication (e.g., amiodarone, lithium).",
    "Transient hypothyroidism (e.g., silent thyroiditis, subacute granulomatous thyroiditis, postpartum thyroiditis)."
  ],
  secondaryHypo: [
    "Pituitary disorders (e.g., pituitary adenoma).",
    "Infiltrative diseases of the pituitary.",
    "Iatrogenic (e.g., following pituitary surgery)."
  ],
  tertiaryHypo: [
    "Hypothalamic disorders."
  ],
  subclinicalHypo: [
    "Same etiologies as primary hypothyroidism."
  ],
  euthyroidLowT3: [
    "Occurs in severe illness or severe physical stress (most common in intensive care patients)."
  ],
  euthyroidLowT3T4: [
    "Occurs in severe illness or severe physical stress (most common in intensive care patients)."
  ],
  primaryHyper: [
    "Graves disease.",
    "Toxic multinodular goiter (toxic MNG).",
    "Toxic adenoma (see thyroid nodules and thyroid cancer).",
    "Postpartum thyroiditis.",
    "Subacute granulomatous thyroiditis (de Quervain thyroiditis)."
  ],
  secondaryHyper: [
    "Thyrotropic (TSH-secreting) pituitary adenoma."
  ],
  subclinicalHyper: [
    "Same etiologies as primary hyperthyroidism."
  ]
};

/**
 * Interpret TSH / FT4 / T3 pattern using the simplified reference table.
 * Inputs: tsh, ft4, t3 ∈ {"high","normal","low","unknown"} (T3 may be "unknown").
 * Returns a structured object.
 */
function interpretThyroidPattern(tsh, ft4, t3) {
  // All normal → no specific disorder
  if (tsh === "normal" && ft4 === "normal" && (t3 === "normal" || t3 === "unknown")) {
    return {
      match: false,
      reason:
        "TSH, free T4, and T3 (if measured) are all marked normal – no specific disorder from this table is highlighted."
    };
  }

  // Euthyroid sick – Low T3 syndrome (requires T3)
  if (tsh === "normal" && ft4 === "normal" && t3 === "low") {
    return {
      match: true,
      diagnosisTitle: "Euthyroid sick: Low T3 syndrome",
      etiologies: THYROID_ETIOLOGIES.euthyroidLowT3
    };
  }

  // Euthyroid sick – Low T3 and T4 syndrome (requires T3)
  if (tsh === "normal" && ft4 === "low" && t3 === "low") {
    return {
      match: true,
      diagnosisTitle: "Euthyroid sick: Low T3 and T4 syndrome",
      etiologies: THYROID_ETIOLOGIES.euthyroidLowT3T4
    };
  }

  // Primary hypothyroidism (overt): TSH high, FT4 low
  if (tsh === "high" && ft4 === "low") {
    return {
      match: true,
      diagnosisTitle: "Primary hypothyroidism (overt)",
      etiologies: THYROID_ETIOLOGIES.primaryHypo
    };
  }

  // Central (secondary/tertiary) hypothyroidism:
  // low TSH with low FT4; T3 may be low or not measured.
  if (tsh === "low" && ft4 === "low" && (t3 === "low" || t3 === "unknown")) {
    return {
      match: true,
      diagnosisTitle: "Secondary or tertiary (central) hypothyroidism",
      etiologies: [
        "Secondary (pituitary causes):",
        ...THYROID_ETIOLOGIES.secondaryHypo,
        "Tertiary (hypothalamic causes):",
        ...THYROID_ETIOLOGIES.tertiaryHypo
      ]
    };
  }

  // Subclinical hypothyroidism: TSH high, FT4 and T3 normal
  if (tsh === "high" && ft4 === "normal" && (t3 === "normal" || t3 === "unknown")) {
    return {
      match: true,
      diagnosisTitle: "Subclinical hypothyroidism",
      etiologies: THYROID_ETIOLOGIES.subclinicalHypo
    };
  }

  // Primary hyperthyroidism: TSH low with elevated thyroid hormone(s)
  if (tsh === "low" && (ft4 === "high" || t3 === "high")) {
    return {
      match: true,
      diagnosisTitle: "Primary hyperthyroidism (overt)",
      etiologies: THYROID_ETIOLOGIES.primaryHyper
    };
  }

  // Secondary hyperthyroidism: TSH high with elevated thyroid hormone(s)
  if (tsh === "high" && (ft4 === "high" || t3 === "high")) {
    return {
      match: true,
      diagnosisTitle: "Secondary hyperthyroidism",
      etiologies: THYROID_ETIOLOGIES.secondaryHyper
    };
  }

  // Subclinical hyperthyroidism: TSH low, FT4 & T3 normal (or T3 not measured)
  if (tsh === "low" && ft4 === "normal" && (t3 === "normal" || t3 === "unknown")) {
    return {
      match: true,
      diagnosisTitle: "Subclinical hyperthyroidism",
      etiologies: THYROID_ETIOLOGIES.subclinicalHyper
    };
  }

  return {
    match: false,
    reason:
      "This specific combination is not directly mapped in the simplified table. Consider reviewing the full cascades and exact numeric values."
  };
}

// Render the interpretation box content for the labs panel
function renderLabInterpretation(container, interpretation) {
  if (!interpretation.match) {
    container.innerHTML = `
      <div class="labs-result">
        <p class="labs-note labs-note--warning">
          ${interpretation.reason}
        </p>
      </div>
    `;
    return;
  }

  const etiologiesHtml =
    interpretation.etiologies && interpretation.etiologies.length
      ? `
      <p class="labs-section-heading">Etiologies</p>
      <ul class="labs-etiology-list">
        ${interpretation.etiologies.map((e) => `<li>${e}</li>`).join("")}
      </ul>
    `
      : "";

  container.innerHTML = `
    <div class="labs-result">
      <p class="labs-result-label">Pattern interpretation</p>
      <h3 class="labs-result-title">${interpretation.diagnosisTitle}</h3>
      ${etiologiesHtml}
    </div>
  `;
}

// Handle lab interpretation submission (home screen)
function handleLabInterpretSubmit(event) {
  event.preventDefault();

  const tsh = document.getElementById("tshStatus")?.value || "";
  const ft4 = document.getElementById("ft4Status")?.value || "";
  const t3 = document.getElementById("t3Status")?.value || "";
  const outputEl = document.getElementById("lab-interpret-output");

  if (!outputEl) return;

  if (!tsh || !ft4 || !t3) {
    outputEl.innerHTML = `
      <div class="labs-result">
        <p class="labs-note labs-note--warning">
          Please select a status for TSH, free T4, and T3 (or choose "Unknown" for T3).
        </p>
      </div>
    `;
    return;
  }

  const interpretation = interpretThyroidPattern(tsh, ft4, t3);
  renderLabInterpretation(outputEl, interpretation);
}

// ---------- App State ----------

let appState = {
  view: "home", // "home" | "cascade"
  activeTreeKey: null,
  currentNodeId: null,
  history: [] // stack of previous nodeIds
};

function initThyroidCascader() {
  renderCurrentScreen();
}

// ---------- Rendering ----------

function renderCurrentScreen() {
  const container = document.getElementById("screen-container");
  if (!container) return;

  if (appState.view === "home") {
    container.innerHTML = renderHomeScreen();
    attachHomeEvents();
  } else if (appState.view === "cascade") {
    const tree = decisionTrees[appState.activeTreeKey];
    const node = tree?.nodes?.[appState.currentNodeId];
    container.innerHTML = renderCascadeScreen(tree, node);
    attachCascadeEvents(tree, node);
  }
}

// Home screen

function renderHomeScreen() {
  return `
    <section class="labs-panel">
      <div class="labs-header">
        <div class="option-label option-label--red">Option 1</div>
        <h2 class="labs-title">Interpret these labs</h2>
        <p class="labs-subtitle">
          Choose whether TSH, free T4, and T3 are elevated, normal, or decreased to match the reference table patterns.
        </p>
      </div>

      <form id="lab-interpret-form" class="labs-form">
        <div class="labs-field">
          <label for="tshStatus" class="labs-label">TSH</label>
          <select id="tshStatus" name="tshStatus" class="labs-select" required>
            <option value="">Select…</option>
            <option value="high">Elevated</option>
            <option value="normal">Normal</option>
            <option value="low">Decreased</option>
          </select>
        </div>

        <div class="labs-field">
          <label for="ft4Status" class="labs-label">Free T4</label>
          <select id="ft4Status" name="ft4Status" class="labs-select" required>
            <option value="">Select…</option>
            <option value="high">Elevated</option>
            <option value="normal">Normal</option>
            <option value="low">Decreased</option>
          </select>
        </div>

        <div class="labs-field">
          <label for="t3Status" class="labs-label">T3</label>
          <select id="t3Status" name="t3Status" class="labs-select" required>
            <option value="">Select…</option>
            <option value="high">Elevated</option>
            <option value="normal">Normal</option>
            <option value="low">Decreased</option>
            <option value="unknown">Unknown / not measured</option>
          </select>
        </div>

        <button type="submit" class="btn-primary labs-submit">
          Interpret
        </button>
      </form>

      <div id="lab-interpret-output" class="labs-output">
        <p class="results-placeholder">
          Select a pattern and click “Interpret” to see the corresponding disorder and etiologies.
        </p>
      </div>
    </section>

    <div class="home-intro">
      <div class="option-label option-label--red">Option 2</div>
      <p>
        Select the presentation that best matches your clinical question.
        Each path will walk through a stepwise thyroid decision tree. This tool
        does not generate management recommendations.
      </p>
    </div>

    <div class="home-grid">
      <article class="home-card" data-tree="hypo">
        <div>
          <h2 class="home-card-title">Hypothyroid symptoms</h2>
          <p class="home-card-body">
            Fatigue, weight gain, cold intolerance, constipation, dry skin, or
            bradycardia.
          </p>
        </div>
        <div class="home-tag">Start hypothyroid cascade →</div>
      </article>

      <article class="home-card" data-tree="hyper">
        <div>
          <h2 class="home-card-title">Hyperthyroid symptoms</h2>
          <p class="home-card-body">
            Palpitations, tremor, heat intolerance, weight loss, anxiety, or
            thyroid eye findings.
          </p>
        </div>
        <div class="home-tag">Start hyperthyroid cascade →</div>
      </article>

      <article class="home-card" data-tree="nodule">
        <div>
          <h2 class="home-card-title">Thyroid nodule</h2>
          <p class="home-card-body">
            Solitary or multinodular thyroid enlargement found clinically or on
            imaging.
          </p>
        </div>
        <div class="home-tag">Start nodule cascade →</div>
      </article>
    </div>
  `;
}

function attachHomeEvents() {
  const cards = document.querySelectorAll(".home-card[data-tree]");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const treeKey = card.getAttribute("data-tree");
      startCascade(treeKey);
    });
  });

  const labForm = document.getElementById("lab-interpret-form");
  if (labForm) {
    labForm.addEventListener("submit", handleLabInterpretSubmit);
  }
}

// Cascade screen (single node)

function renderCascadeScreen(tree, node) {
  if (!tree || !node) {
    return `
      <div class="cascade-shell">
        <p>Unable to load this cascade. Please return to the home screen.</p>
        <button class="btn-secondary" data-action="go-home">Back to home</button>
      </div>
    `;
  }

  const isOutcome = node.type === "outcome";

  const optionsHtml =
    !isOutcome && node.options && node.options.length
      ? `
      <div class="cascade-options">
        ${node.options
          .map(
            (opt, index) => `
          <button
            class="cascade-option-btn"
            data-next="${opt.next}"
          >
            ${String.fromCharCode(65 + index)}. ${opt.label}
          </button>
        `
          )
          .join("")}
      </div>
      `
      : "";

  const outcomeHtml = isOutcome
    ? `
      <div>
        ${
          node.note
            ? `<p class="outcome-note">${node.note}</p>`
            : ""
        }
      </div>
    `
    : "";

  const noteHtml =
    !isOutcome && node.note
      ? `<p class="cascade-note">${node.note}</p>`
      : "";

  const stepInfo = computeStepInfo(tree, node);

  return `
    <div class="cascade-shell">
      <div class="cascade-topbar">
        <div class="cascade-left">
          <div class="icon-back" data-action="back">
            <span>←</span>
          </div>
          <div>
            <div class="cascade-label">${tree.title}</div>
            <div class="cascade-step">${stepInfo}</div>
          </div>
        </div>

        <button class="btn-secondary" data-action="go-home">
          Home
        </button>
      </div>

      <div class="cascade-main">
        <div>
          <h2 class="cascade-question">${node.text}</h2>
          ${noteHtml}
          ${optionsHtml}
          ${outcomeHtml}
        </div>

        ${
          isOutcome
            ? `
          <div class="cascade-actions">
            <button class="btn-primary" data-action="restart">
              Restart this cascade
            </button>
            <button class="btn-secondary" data-action="go-home">
              Choose a different path
            </button>
          </div>
        `
            : ""
        }
      </div>
    </div>
  `;
}

function attachCascadeEvents(tree, node) {
  const container = document.getElementById("screen-container");
  if (!container) return;

  const backBtn = container.querySelector('[data-action="back"]');
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      goBack();
    });
  }

  const homeBtns = container.querySelectorAll('[data-action="go-home"]');
  homeBtns.forEach((btn) =>
    btn.addEventListener("click", () => {
      goHome();
    })
  );

  const restartBtn = container.querySelector('[data-action="restart"]');
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      restartCascade();
    });
  }

  const optionButtons = container.querySelectorAll(".cascade-option-btn");
  optionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const nextId = btn.getAttribute("data-next");
      if (nextId) {
        goToNode(nextId);
      }
    });
  });
}

// ---------- Navigation Helpers ----------

function startCascade(treeKey) {
  const tree = decisionTrees[treeKey];
  if (!tree) return;

  appState = {
    view: "cascade",
    activeTreeKey: treeKey,
    currentNodeId: tree.rootId,
    history: []
  };

  renderCurrentScreen();
}

function restartCascade() {
  const tree = decisionTrees[appState.activeTreeKey];
  if (!tree) {
    goHome();
    return;
  }

  appState.currentNodeId = tree.rootId;
  appState.history = [];
  renderCurrentScreen();
}

function goToNode(nodeId) {
  if (!nodeId) return;
  appState.history.push(appState.currentNodeId);
  appState.currentNodeId = nodeId;
  renderCurrentScreen();
}

function goBack() {
  if (appState.history.length === 0) {
    goHome();
    return;
  }
  appState.currentNodeId = appState.history.pop();
  renderCurrentScreen();
}

function goHome() {
  appState = {
    view: "home",
    activeTreeKey: null,
    currentNodeId: null,
    history: []
  };
  renderCurrentScreen();
}

function computeStepInfo(tree, node) {
  if (!tree || !node) return "";
  const isOutcome = node.type === "outcome";
  return isOutcome
    ? "Final node – review and correlate clinically."
    : "Decision node – choose the branch that best fits the scenario.";
}
