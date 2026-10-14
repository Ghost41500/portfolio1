/* ==========================================================================
   SCRIPT : affiche le contenu de contenu.js dans la page
   --------------------------------------------------------------------------
   Tu n'as normalement pas besoin de modifier ce fichier.
   Il construit chaque section, relie les compétences aux projets et
   certifications qui les prouvent, et gère le thème clair/sombre, le menu
   mobile, la console du haut de page et les attestations.
   ========================================================================== */

(function () {
  "use strict";

  const D = typeof PORTFOLIO !== "undefined" ? PORTFOLIO : null;
  const erreurs = [];
  const moinsDeMouvement = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Petits outils ---------- */
  const echapper = (texte) => String(texte ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  const rempli = (v) => (Array.isArray(v) ? v.length > 0 : v != null && String(v).trim() !== "");
  const liste = (v) => (Array.isArray(v) ? v : []);
  const zone = (nom) => document.querySelector(`[data-rendu="${nom}"]`);

  /* ---------- contenu.js illisible : message clair au lieu d'une page vide ---------- */
  if (!D) {
    const details = (window.erreursContenu || []).map(echapper).join("\n");
    document.getElementById("contenu").innerHTML = `
      <div class="conteneur erreur-fatale">
        <h1>Le contenu du portfolio n’a pas pu être chargé</h1>
        <p>Le fichier contenu.js contient une erreur : il manque sans doute une virgule, un guillemet ou une accolade. Ouvrez la console du navigateur (touche F12) pour voir la ligne concernée.</p>
        ${details ? `<pre>${details}</pre>` : ""}
      </div>`;
    return;
  }

  const site = D.site || {};
  const profil = D.profil || {};
  const stage = profil.stage || {};
  const niveaux = D.niveaux || {};
  const categories = liste(D.competences);
  const projets = liste(D.projets);
  const certifications = liste(D.certifications);
  const invite = `<span class="console__invite">${echapper(site.nomMachine || "portfolio")}#</span> `;

  /* ---------- Index des compétences et de leurs preuves ---------- */
  const competences = {};
  categories.forEach((cat) => liste(cat.items).forEach((c) => {
    if (!rempli(c.id)) { erreurs.push(`Une compétence de « ${cat.categorie} » n’a pas d’id.`); return; }
    if (competences[c.id]) erreurs.push(`L’id de compétence « ${c.id} » est utilisé deux fois.`);
    if (!niveaux[c.niveau]) erreurs.push(`Niveau « ${c.niveau} » inconnu pour la compétence « ${c.id} ». Valeurs possibles : ${Object.keys(niveaux).join(", ")}.`);
    competences[c.id] = c;
  }));

  const preuves = {};
  const ajouterPreuve = (id, preuve, source) => {
    if (!competences[id]) { erreurs.push(`${source} cite la compétence « ${id} », qui n’existe pas dans la partie 4.`); return; }
    (preuves[id] = preuves[id] || []).push(preuve);
  };
  const idsProjets = new Set();
  projets.forEach((p) => {
    if (!rempli(p.id)) erreurs.push(`Le projet « ${p.titre} » n’a pas d’id.`);
    if (idsProjets.has(p.id)) erreurs.push(`L’id de projet « ${p.id} » est utilisé deux fois.`);
    idsProjets.add(p.id);
    liste(p.competences).forEach((id) => ajouterPreuve(id, { type: p.type || "Projet", titre: p.titreCourt || p.titre, cible: `projet-${p.id}` }, `Le projet « ${p.id} »`));
  });
  certifications.forEach((c) => liste(c.competences).forEach((id) =>
    ajouterPreuve(id, { type: "Certification", titre: c.titreCourt || c.titre, cible: `certif-${c.id}` }, `La certification « ${c.id} »`)));
  liste(D.parcours).forEach((e) => {
    if (rempli(e.projet) && !idsProjets.has(e.projet)) erreurs.push(`Le parcours « ${e.quoi} » renvoie au projet « ${e.projet} », qui n’existe pas.`);
  });

  /* ---------- Morceaux réutilisés ---------- */
  const rendreNiveau = (cle) => {
    const n = niveaux[cle] || { nom: cle };
    return `<span class="niveau niveau--${echapper(cle)}"><span class="niveau__barres" aria-hidden="true"><i></i><i></i><i></i></span><span>${echapper(n.nom)}</span></span>`;
  };
  const rendreEtiquettes = (items) => (rempli(items)
    ? `<ul class="etiquettes">${items.map((t) => `<li><span class="etiquette">${echapper(t)}</span></li>`).join("")}</ul>`
    : "");
  const rendrePuces = (items) => (rempli(items)
    ? `<ul class="liste">${items.map((t) => `<li>${echapper(t)}</li>`).join("")}</ul>`
    : "");
  const barreConsole = `<div class="console__barre"><span>Console</span><span>9600 8N1</span></div>`;

  /* ---------- Accueil ---------- */
  function construireConsole() {
    const blocs = [{
      commande: "show profil",
      lignes: [["Nom", profil.nom], ["Formation", profil.formation], ["Année", profil.annee], ["Spécialité", profil.specialite], ["École", profil.etablissement]],
    }];
    const certs = certifications.filter((c) => rempli(c.console));
    if (certs.length) blocs.push({ commande: "show certifications", lignes: certs.map((c) => [c.titreCourt || c.titre, c.console]) });
    if (stage.enRecherche) {
      blocs.push({
        commande: "show stage",
        lignes: [["Poste", stage.poste], ["Durée", stage.duree], ["Disponibilité", stage.disponibilite], ["Statut", "en recherche", true]],
      });
    }
    let html = "";
    blocs.forEach((b) => {
      html += `<div class="console__ligne console__ligne--commande">${invite}<span class="console__frappe" data-texte="${echapper(b.commande)}">${echapper(b.commande)}</span></div>`;
      b.lignes.filter((l) => rempli(l[1])).forEach(([cle, valeur, led]) => {
        html += `<div class="console__ligne"><span class="console__cle">${echapper(cle)}</span><span class="console__valeur">${led ? `<span class="console__led"></span>` : ""}${echapper(valeur)}</span></div>`;
      });
    });
    html += `<div class="console__ligne console__ligne--invite">${invite}<span class="console__curseur"></span></div>`;
    return html;
  }

  function rendreAccueil() {
    const z = zone("accueil");
    const statut = stage.enRecherche
      ? `<p class="hero__statut"><span class="led" aria-hidden="true"></span><span>Je recherche un stage de ${echapper(stage.poste)} (${echapper(stage.duree)}).${rempli(stage.disponibilite) ? ` Disponible ${echapper(stage.disponibilite)}.` : ""}</span></p>`
      : "";
    z.innerHTML = `
      <div class="conteneur hero__grille">
        <div class="hero__identite">
          ${rempli(profil.photo) ? `<img class="hero__photo" src="${echapper(profil.photo)}" alt="Photo de ${echapper(profil.nom)}" width="120" height="120">` : ""}
          <h1 class="hero__nom">${echapper(profil.nom)}</h1>
          ${rempli(profil.accroche) ? `<p class="hero__role">${echapper(profil.accroche)}</p>` : ""}
          ${statut}
          <div class="hero__actions">
            <a class="bouton bouton--plein" href="#projets">Voir mes projets</a>
            ${rempli(profil.cv) ? `<a class="bouton" href="${echapper(profil.cv)}" download>Télécharger mon CV</a>` : ""}
          </div>
        </div>
        <div class="console" aria-hidden="true">
          ${barreConsole}
          <div class="console__corps">${construireConsole()}</div>
        </div>
      </div>`;
  }

  /* La console se tape une seule fois au chargement ; un clic l'affiche en entier. */
  function animerConsole() {
    const corps = document.querySelector(".hero .console__corps");
    if (!corps || moinsDeMouvement) return;
    const lignes = [...corps.querySelectorAll(".console__ligne")];
    const frappes = [...corps.querySelectorAll(".console__frappe")];
    const minuteurs = new Set();
    let i = 0;
    let termine = false;

    const attendre = (fn, ms) => {
      const t = setTimeout(() => { minuteurs.delete(t); fn(); }, ms);
      minuteurs.add(t);
    };
    const toutAfficher = () => {
      if (termine) return;
      termine = true;
      minuteurs.forEach(clearTimeout);
      lignes.forEach((l) => l.classList.remove("est-masquee"));
      frappes.forEach((f) => { f.textContent = f.dataset.texte; });
    };
    const suivante = () => {
      if (i >= lignes.length) { termine = true; return; }
      const ligne = lignes[i++];
      ligne.classList.remove("est-masquee");
      const frappe = ligne.querySelector(".console__frappe");
      if (!frappe) { attendre(suivante, 70); return; }
      const texte = frappe.dataset.texte;
      let k = 0;
      const taper = () => {
        frappe.textContent = texte.slice(0, ++k);
        if (k < texte.length) attendre(taper, 28 + Math.random() * 38);
        else attendre(suivante, 260);
      };
      attendre(taper, 180);
    };

    lignes.forEach((l) => l.classList.add("est-masquee"));
    frappes.forEach((f) => { f.textContent = ""; });
    corps.closest(".console").addEventListener("click", toutAfficher);
    attendre(suivante, 450);
  }

  /* ---------- À propos ---------- */
  function rendreAPropos() {
    const a = D.aPropos || {};
    const groupes = [];
    if (rempli(a.langues)) {
      groupes.push(["Langues", `<ul class="fiche__liste">${a.langues.map((l) =>
        `<li class="langue"><span>${echapper(l.nom)}</span><span class="langue__niveau">${echapper(l.niveau)}</span></li>`).join("")}</ul>`]);
    }
    if (rempli(a.atouts)) groupes.push(["Atouts", rendrePuces(a.atouts)]);
    if (rempli(a.infosPratiques)) groupes.push(["Infos pratiques", rendreEtiquettes(a.infosPratiques)]);
    if (rempli(a.interets)) groupes.push(["Centres d’intérêt", rendreEtiquettes(a.interets)]);
    zone("a-propos").innerHTML = `
      <div class="a-propos">
        <div class="a-propos__texte">${liste(a.paragraphes).map((p) => `<p>${echapper(p)}</p>`).join("")}</div>
        ${groupes.length ? `<div class="fiche">${groupes.map(([titre, html]) =>
          `<div class="fiche__groupe"><h3 class="fiche__titre">${titre}</h3>${html}</div>`).join("")}</div>` : ""}
      </div>`;
  }

  /* ---------- Compétences ---------- */
  function rendreCompetences() {
    const legende = `<ul class="legende" aria-label="Signification des niveaux">${Object.keys(niveaux).map((k) =>
      `<li>${rendreNiveau(k)}<span class="legende__texte">${echapper(niveaux[k].explication)}</span></li>`).join("")}</ul>`;

    const tableaux = categories.map((cat) => {
      const lignes = liste(cat.items).filter((c) => rempli(c.id)).map((c) => {
        const liens = (preuves[c.id] || []).map((p) =>
          `<li><a class="etiquette" href="#${echapper(p.cible)}" data-cible="${echapper(p.cible)}"><span class="etiquette__type">${echapper(p.type)}</span>${echapper(p.titre)}</a></li>`).join("");
        return `<tr id="competence-${echapper(c.id)}">`
          + `<td><span class="competence__nom">${echapper(c.nom)}</span>${rempli(c.detail) ? `<span class="competence__detail">${echapper(c.detail)}</span>` : ""}</td>`
          + `<td>${rendreNiveau(c.niveau)}</td>`
          + `<td>${liens ? `<ul class="etiquettes" aria-label="Preuves">${liens}</ul>` : ""}</td>`
          + `</tr>`;
      }).join("");
      return `<div class="groupe-competences"><table class="table-competences">`
        + `<caption>${echapper(cat.categorie)}</caption>`
        + `<thead><tr><th scope="col">Compétence</th><th scope="col" class="col-niveau">Niveau</th><th scope="col" class="col-preuves">Preuves</th></tr></thead>`
        + `<tbody>${lignes}</tbody></table></div>`;
    }).join("");

    const outils = rempli(D.outils)
      ? `<div class="outils"><h3 class="sous-titre">Outils utilisés</h3>${rendreEtiquettes(D.outils)}</div>`
      : "";
    zone("competences").innerHTML = legende + tableaux + outils;
  }

  /* ---------- Projets ---------- */
  function rendreProjets() {
    zone("projets").innerHTML = projets.map((p) => {
      const id = echapper(p.id);
      const meta = [
        rempli(p.categorie) ? `<span class="projet__categorie">${echapper(p.categorie)}</span>` : "",
        rempli(p.cadre) ? `<span>${echapper(p.cadre)}</span>` : "",
        rempli(p.periode) ? `<span>${echapper(p.periode)}</span>` : "",
      ].join("");
      const comps = liste(p.competences).filter((c) => competences[c]).map((c) =>
        `<li><a class="etiquette" href="#competence-${echapper(c)}" data-cible="competence-${echapper(c)}">${echapper(competences[c].nom)}</a></li>`).join("");

      const infos = [];
      if (rempli(p.contexte)) infos.push(["Contexte", `<p>${echapper(p.contexte)}</p>`]);
      if (rempli(p.objectif)) infos.push(["Objectif", `<p>${echapper(p.objectif)}</p>`]);
      if (rempli(p.realisations)) infos.push(["Ce que j’ai fait", rendrePuces(p.realisations)]);
      if (rempli(p.outils)) infos.push(["Outils", rendreEtiquettes(p.outils)]);
      if (rempli(p.resultat)) infos.push(["Résultat", `<p>${echapper(p.resultat)}</p>`]);
      if (rempli(p.liens)) {
        infos.push(["Documents", `<ul class="liste">${p.liens.map((l) =>
          `<li><a href="${echapper(l.url)}" target="_blank" rel="noopener">${echapper(l.texte)}</a></li>`).join("")}</ul>`]);
      }
      const image = rempli(p.image)
        ? `<figure class="projet__image"><img src="${echapper(p.image)}" alt="${echapper(p.legendeImage || `Illustration du projet ${p.titre}`)}" loading="lazy"></figure>`
        : "";
      const detail = infos.length || image ? `
        <button class="projet__bascule" type="button" aria-expanded="false" aria-controls="detail-${id}">
          <span>Afficher le détail</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3.5 6l4.5 4.5L12.5 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div class="projet__detail" id="detail-${id}" hidden>
          ${image}
          <dl class="infos">${infos.map(([titre, html]) => `<div class="infos__ligne"><dt>${titre}</dt><dd>${html}</dd></div>`).join("")}</dl>
        </div>` : "";

      return `
        <article class="projet" id="projet-${id}">
          <div class="projet__meta">${meta}</div>
          <div class="projet__corps">
            <h3 class="projet__titre">${echapper(p.titre)}</h3>
            ${rempli(p.resume) ? `<p class="projet__resume">${echapper(p.resume)}</p>` : ""}
            ${comps ? `<p class="projet__label">Compétences mobilisées</p><ul class="etiquettes">${comps}</ul>` : ""}
            ${detail}
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- Parcours ---------- */
  function rendreParcours() {
    const etapes = [];
    if (stage.enRecherche) {
      etapes.push({
        quand: "Prochaine étape",
        quoi: `Stage de ${stage.poste}`,
        ou: [stage.duree, rempli(stage.disponibilite) ? `disponible ${stage.disponibilite}` : ""].filter(rempli).join(", "),
        etat: "a-venir",
      });
    }
    liste(D.parcours).forEach((e) => etapes.push(e));
    zone("parcours").innerHTML = `<ol class="frise">${etapes.map((e) => `
      <li class="frise__etape${rempli(e.etat) ? ` frise__etape--${echapper(e.etat)}` : ""}">
        <div class="frise__quand">${echapper(e.quand)}</div>
        <div class="frise__noeud" aria-hidden="true"><span class="frise__point"></span></div>
        <div class="frise__contenu">
          <h3 class="frise__titre">${echapper(e.quoi)}</h3>
          ${rempli(e.ou) ? `<p class="frise__lieu">${echapper(e.ou)}</p>` : ""}
          ${rendrePuces(e.details)}
          ${rempli(e.projet) ? `<a class="frise__lien" href="#projet-${echapper(e.projet)}" data-cible="projet-${echapper(e.projet)}">Voir ce que j’y ai fait</a>` : ""}
        </div>
      </li>`).join("")}</ol>`;
  }

  /* ---------- Certifications ---------- */
  function rendreCertifications() {
    zone("certifications").innerHTML = certifications.map((c) => {
      const meta = [c.organisme, c.date].filter(rempli).map(echapper).join(", ");
      const v = c.verification;
      const comps = liste(c.competences).filter((id) => competences[id]).map((id) =>
        `<li><a class="etiquette" href="#competence-${echapper(id)}" data-cible="competence-${echapper(id)}">${echapper(competences[id].nom)}</a></li>`).join("");
      const actions = [
        rempli(c.image) ? `<button class="bouton bouton--petit" type="button" data-attestation="${echapper(c.image)}" data-titre="${echapper(c.titre)}">Voir l’attestation</button>` : "",
        v && rempli(v.url) ? `<a class="bouton bouton--petit" href="${echapper(v.url)}" target="_blank" rel="noopener">${echapper(v.texte || "Vérifier")}</a>` : "",
      ].join("");
      return `
        <article class="certif" id="certif-${echapper(c.id)}">
          <h4 class="certif__titre">${echapper(c.titre)}</h4>
          ${meta ? `<p class="certif__meta">${meta}</p>` : ""}
          ${rempli(c.resultat) ? `<p class="certif__resultat">${echapper(c.resultat)}</p>` : ""}
          ${rempli(c.details) && rempli(c.titreDetails) ? `<p class="certif__sous-titre">${echapper(c.titreDetails)}</p>` : ""}
          ${rendrePuces(c.details)}
          ${v && rempli(v.code) ? `<p class="certif__code">Code de vérification : <code>${echapper(v.code)}</code></p>` : ""}
          ${comps ? `<p class="certif__sous-titre">Compétences validées</p><ul class="etiquettes">${comps}</ul>` : ""}
          ${actions ? `<div class="certif__actions">${actions}</div>` : ""}
        </article>`;
    }).join("");
  }

  /* ---------- Contact ---------- */
  function rendreContact() {
    const c = D.contact || {};
    const emails = liste(c.emails).filter((e) => rempli(e.adresse));
    const adresseCourte = (url) => String(url).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    const lignes = [];
    emails.forEach((e) => lignes.push([
      e.libelle || "Email",
      `<a href="mailto:${echapper(e.adresse)}">${echapper(e.adresse)}</a>`,
      `<button class="bouton-copier" type="button" data-copier="${echapper(e.adresse)}">Copier</button>`,
    ]));
    if (rempli(c.linkedin)) lignes.push(["LinkedIn", `<a href="${echapper(c.linkedin)}" target="_blank" rel="noopener">${echapper(adresseCourte(c.linkedin))}</a>`]);
    if (rempli(c.github)) lignes.push(["GitHub", `<a href="${echapper(c.github)}" target="_blank" rel="noopener">${echapper(adresseCourte(c.github))}</a>`]);
    if (rempli(c.localisation)) lignes.push(["Localisation", echapper(c.localisation)]);

    const actions = [
      emails[0] ? `<a class="bouton bouton--plein" href="mailto:${echapper(emails[0].adresse)}">M’écrire</a>` : "",
      rempli(c.linkedin) ? `<a class="bouton" href="${echapper(c.linkedin)}" target="_blank" rel="noopener">Voir mon profil LinkedIn</a>` : "",
      rempli(profil.cv) ? `<a class="bouton" href="${echapper(profil.cv)}" download>Télécharger mon CV</a>` : "",
    ].join("");

    zone("contact").innerHTML = `
      <div class="contact">
        <div class="console">
          ${barreConsole}
          <div class="console__corps">
            <div class="console__ligne console__ligne--commande" aria-hidden="true">${invite}show contact</div>
            ${lignes.map(([cle, valeur, bouton]) =>
              `<div class="contact__ligne"><span class="console__cle">${echapper(cle)}</span><span class="console__valeur">${valeur}</span>${bouton || "<span></span>"}</div>`).join("")}
          </div>
        </div>
        <div class="contact__actions">${actions}</div>
      </div>`;
  }

  /* ---------- Pied de page, titres, intros ---------- */
  function rendreTextesFixes() {
    const marque = document.querySelector(".marque__nom");
    if (marque && rempli(profil.nom)) marque.textContent = profil.nom;
    document.querySelectorAll("[data-intro]").forEach((p) => {
      const texte = (D.intros || {})[p.dataset.intro];
      p.textContent = rempli(texte) ? texte : "";
    });
    zone("pied").textContent = `© ${new Date().getFullYear()} ${profil.nom || ""}.`
      + (rempli(site.miseAJour) ? ` Dernière mise à jour : ${site.miseAJour}.` : "");
  }

  /* ---------- Thème clair / sombre ---------- */
  function initTheme() {
    const racine = document.documentElement;
    const bouton = document.querySelector(".theme-bouton");
    const couleurBarre = document.querySelector('meta[name="theme-color"]');
    const maj = () => {
      const clair = racine.getAttribute("data-theme") === "light";
      bouton.setAttribute("aria-label", clair ? "Passer en mode sombre" : "Passer en mode clair");
      if (couleurBarre) couleurBarre.setAttribute("content", getComputedStyle(racine).getPropertyValue("--fond").trim());
    };
    bouton.addEventListener("click", () => {
      const suivant = racine.getAttribute("data-theme") === "light" ? "dark" : "light";
      racine.setAttribute("data-theme", suivant);
      try { localStorage.setItem("theme", suivant); } catch (e) { /* stockage indisponible : tant pis */ }
      maj();
    });
    maj();
  }

  /* ---------- Menu : mobile et LED de la section affichée ---------- */
  function initNavigation() {
    const bouton = document.querySelector(".nav__bouton");
    const liens = [...document.querySelectorAll(".nav__lien")];
    const fermer = () => {
      document.body.classList.remove("menu-ouvert");
      bouton.setAttribute("aria-expanded", "false");
    };
    bouton.addEventListener("click", (e) => {
      e.stopPropagation();
      const ouvert = !document.body.classList.contains("menu-ouvert");
      document.body.classList.toggle("menu-ouvert", ouvert);
      bouton.setAttribute("aria-expanded", String(ouvert));
    });
    liens.forEach((a) => a.addEventListener("click", fermer));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") fermer(); });
    document.addEventListener("click", (e) => { if (!e.target.closest(".nav")) fermer(); });

    const sections = liens.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);
    const activer = (id) => liens.forEach((a) => {
      if (a.hash === `#${id}`) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
    activer(sections[0] ? sections[0].id : "");
    if (!("IntersectionObserver" in window)) return;
    const observateur = new IntersectionObserver((entrees) => {
      entrees.forEach((en) => { if (en.isIntersecting) activer(en.target.id); });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => observateur.observe(s));
    // Tout en bas de la page, la dernière section s'allume
    window.addEventListener("scroll", () => {
      const enBas = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (enBas && sections.length) activer(sections[sections.length - 1].id);
    }, { passive: true });
  }

  /* ---------- Clics : preuves, détails, attestations, copie ---------- */
  function initInteractions() {
    const annonce = document.querySelector("[data-annonce]");
    const dire = (message) => {
      if (!annonce) return;
      annonce.textContent = "";
      setTimeout(() => { annonce.textContent = message; }, 50);
    };
    const dialogue = document.querySelector(".visionneuse");

    document.addEventListener("click", async (e) => {
      // Lien vers une compétence, un projet ou une certification : défilement + signal
      const lien = e.target.closest("a[data-cible]");
      if (lien) {
        const cible = document.getElementById(lien.dataset.cible);
        if (!cible) return;
        e.preventDefault();
        cible.scrollIntoView({ behavior: moinsDeMouvement ? "auto" : "smooth", block: "center" });
        history.replaceState(null, "", `#${lien.dataset.cible}`);
        cible.setAttribute("tabindex", "-1");
        cible.focus({ preventScroll: true });
        cible.classList.remove("est-cible");
        void cible.offsetWidth;
        cible.classList.add("est-cible");
        setTimeout(() => cible.classList.remove("est-cible"), 2400);
        return;
      }

      // Afficher ou masquer le détail d'un projet
      const bascule = e.target.closest(".projet__bascule");
      if (bascule) {
        const detail = document.getElementById(bascule.getAttribute("aria-controls"));
        const ouvrir = bascule.getAttribute("aria-expanded") !== "true";
        bascule.setAttribute("aria-expanded", String(ouvrir));
        bascule.querySelector("span").textContent = ouvrir ? "Masquer le détail" : "Afficher le détail";
        detail.hidden = !ouvrir;
        return;
      }

      // Ouvrir une attestation
      const attestation = e.target.closest("[data-attestation]");
      if (attestation && dialogue) {
        const image = dialogue.querySelector(".visionneuse__image");
        dialogue.querySelector(".visionneuse__titre").textContent = attestation.dataset.titre;
        image.src = attestation.dataset.attestation;
        image.alt = `Attestation : ${attestation.dataset.titre}`;
        dialogue.querySelector(".visionneuse__ouvrir").href = attestation.dataset.attestation;
        if (typeof dialogue.showModal === "function") dialogue.showModal();
        else window.open(attestation.dataset.attestation, "_blank");
        return;
      }

      // Copier une adresse email
      const copier = e.target.closest("[data-copier]");
      if (copier) {
        const texte = copier.dataset.copier;
        let reussi = false;
        try {
          await navigator.clipboard.writeText(texte);
          reussi = true;
        } catch (err) {
          const champ = document.createElement("textarea");
          champ.value = texte;
          champ.setAttribute("readonly", "");
          champ.style.position = "fixed";
          champ.style.opacity = "0";
          document.body.appendChild(champ);
          champ.select();
          try { reussi = document.execCommand("copy"); } catch (err2) { reussi = false; }
          champ.remove();
        }
        copier.textContent = reussi ? "Copié" : "Échec";
        dire(reussi ? "Adresse copiée" : "Impossible de copier l’adresse");
        setTimeout(() => { copier.textContent = "Copier"; }, 1800);
      }
    });

    if (dialogue) {
      dialogue.querySelector(".visionneuse__fermer").addEventListener("click", () => dialogue.close());
      dialogue.addEventListener("click", (e) => { if (e.target === dialogue) dialogue.close(); });
    }
  }

  /* ---------- Erreurs de contenu.js : encadré visible seulement en local ---------- */
  function afficherErreurs() {
    if (!erreurs.length) return;
    erreurs.forEach((m) => console.warn(`[contenu.js] ${m}`));
    const enLocal = location.protocol === "file:" || ["localhost", "127.0.0.1", ""].includes(location.hostname);
    if (!enLocal) return;
    const boite = document.createElement("div");
    boite.className = "alerte-dev";
    boite.setAttribute("role", "alert");
    boite.innerHTML = `<strong>À corriger dans contenu.js</strong> (ce message n’apparaît que sur ton ordinateur)`
      + `<ul>${erreurs.map((m) => `<li>${echapper(m)}</li>`).join("")}</ul>`
      + `<button class="bouton bouton--petit" type="button">Masquer</button>`;
    boite.querySelector("button").addEventListener("click", () => boite.remove());
    document.body.appendChild(boite);
  }

  /* ---------- Lancement ---------- */
  [rendreTextesFixes, rendreAccueil, rendreAPropos, rendreCompetences, rendreProjets,
    rendreParcours, rendreCertifications, rendreContact].forEach((rendre) => {
    try { rendre(); } catch (err) {
      erreurs.push(`Problème pendant l’affichage (${rendre.name}) : ${err.message}`);
      console.error(err);
    }
  });
  initTheme();
  initNavigation();
  initInteractions();
  animerConsole();
  afficherErreurs();

  // Si l'adresse contient une ancre (#projets…), on s'y place une fois tout affiché
  if (location.hash.length > 1) {
    const cible = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (cible) cible.scrollIntoView();
  }
})();
