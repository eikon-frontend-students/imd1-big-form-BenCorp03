document.addEventListener("DOMContentLoaded", () => {
  const upload = document.getElementById("upload");
  const gallery = document.getElementById("gallery");

  if (!upload || !gallery) {
    console.error("Upload ou gallery introuvable");
    return;
  }

  let savedImages = JSON.parse(localStorage.getItem("gallery")) || [];

  // Fonction pour afficher une image avec suppression
  function addImage(src, index) {
    const img = document.createElement("img");
    img.src = src;
    img.dataset.index = index;

    // Suppression au clic
    img.addEventListener("click", () => {
      const i = img.dataset.index;
      savedImages.splice(i, 1);
      localStorage.setItem("gallery", JSON.stringify(savedImages));
      img.remove();
      refreshGallery();
    });

    gallery.appendChild(img);
  }

  // Rafraîchir la galerie après suppression
  function refreshGallery() {
    gallery.innerHTML = "";
    savedImages.forEach((src, i) => addImage(src, i));
  }

  // Affichage initial
  refreshGallery();

  // Upload de nouvelles images
  upload.addEventListener("change", () => {
    const files = upload.files;

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = () => {
        savedImages.push(reader.result);
        localStorage.setItem("gallery", JSON.stringify(savedImages));
        refreshGallery();
      };

      reader.readAsDataURL(file);
    }
  });
});

document.getElementById("upload-btn").addEventListener("click", () => {
  document.getElementById("upload").click();
});
