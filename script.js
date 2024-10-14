const firebaseConfig = {
  apiKey: "AIzaSyCfePliqqeBTvcYWhH8NWDQAQMVKmW8RVg",
  authDomain: "formdemo-c9af6.firebaseapp.com",
  projectId: "formdemo-c9af6",
  storageBucket: "formdemo-c9af6.appspot.com",
  messagingSenderId: "633215145023",
  appId: "1:633215145023:web:b21117fc6ba80e2ef5548a"
};
firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase
const database = firebase.firestore();// db repre

const addData = (contact) => {
  database.collection("usuario") // Use database instead of contactForm
    .add(contact)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      readAll();
    })
    .catch((error) => console.error("Error adding document: ", error));
};

const readAll = () => {
  cleanContactList();
  database.collection("usuario") // Use database instead of contactForm
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const contact = doc.data();
        printContact(contact.nombre, contact.email, contact.mensaje, contact.urlImagen, doc.id);
      });
    })
    .catch((error) => console.log('Error reading documents:', error));
};

const cleanContactList = () => {
  document.getElementById('contactList').innerHTML = "";
};

const printContact = (nombre, email, mensaje, urlImagen, id) => {
  const listaDeContactos = document.getElementById("contactList");
  let elementoLista = document.createElement("li");
  let contenidoContacto = `
    <strong>${nombre}</strong> (${email})<br>
    ${mensaje}<br>
    ${urlImagen ? `<img src='${urlImagen}' alt='Imagen de contacto' width='50'>` : ''}
  `;
  elementoLista.innerHTML = contenidoContacto;

  let botonBorrar = document.createElement("button");
  botonBorrar.textContent = "Borrar";
  botonBorrar.dataset.id = id;

  botonBorrar.addEventListener("click", function () {
    let id = this.dataset.id;
    borrarContacto(id);
  });

  elementoLista.appendChild(botonBorrar);
  listaDeContactos.appendChild(elementoLista);
};

const borrarContacto = (id) => {
  database.collection("usuario").doc(id).delete() // Use database instead of contactForm
    .then(() => {
      console.log("Document successfully deleted!");
      readAll();
    })
    .catch((error) => console.error("Error removing document: ", error));
};

document.addEventListener("DOMContentLoaded", function () {
  let formularioDeContacto = document.getElementById("contactForm");
  let botonBorrarTodos = document.getElementById("clearAll");

  readAll(); 

  formularioDeContacto.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let mensaje = document.getElementById("mensaje").value;
    let urlImagen = document.getElementById("imageUrl").value;

    addData({ nombre, email, mensaje, urlImagen });
    formularioDeContacto.reset();
  });

  botonBorrarTodos.addEventListener("click", function () {
    if (confirm("¿Estás seguro de que deseas borrar todos los contactos?")) {
      database.collection("usuario").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          doc.ref.delete();
        });
        readAll();
      });
    }
  });
});

// //Create
// const createUsuario = (picture) => {
//   database.collection("users")
//     .add(contact)
//     .then((docRef) => {
//       console.log("Document written with ID: ", docRef.id)
//       readAll();
//     })
//     .catch((error) => console.error("Error adding document: ", error));
// };

// //Read all
// const readAll = () => {
//   // Limpia el album para mostrar el resultado
//   cleanAlbum();

//   //Petición a Firestore para leer todos los documentos de la colección album
//   database.collection("users")
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         printPhoto(doc.data().title, doc.data().url, doc.id)
//       });

//     })
//     .catch(() => console.log('Error reading documents'));;
// };

// //Delete
// const deletePicture = () => {
//   const id = prompt('Introduce el ID a borrar');
//   database.collection('users').doc(id).delete().then(() => {
//     alert(`Documento ${id} ha sido borrado`);
//     //Clean
//     document.getElementById('album').innerHTML = "";
//     //Read all again
//     readAll();
//   })
//     .catch(() => console.log('Error borrando documento'));
// };

// //Clean 
// const cleanAlbum = () => {
//   document.getElementById('album').innerHTML = "";
// };

// //Show on page load
// /* readAll(); */

// //**********EVENTS**********

// //Create
// document.getElementById("create").addEventListener("click", () => {
//   const title = prompt("Introduce el título de tu foto");
//   const url = prompt("Introduce la url de tu foto");
//   if (!title || !url) {
//     alert("Hay un campo vacio. No se ha salvado");
//     return
//   }
//   createUsuario({
//     nombre,
//     url,
//     email,
//     mensaje
//   });
// });

// //Read all
// document.getElementById("read-all").addEventListener("click", () => {
//   readAll();
// });

// //Read one
// document.getElementById('read-one').addEventListener("click", () => {
//   const id = prompt("Introduce el id a buscar");
//   readOne(id);
// });

// //Delete one
// document.getElementById('delete').addEventListener('click', () => {
//   deletePicture();
// });

// //Clean
// document.getElementById('clean').addEventListener('click', () => {
//   cleanAlbum();
// });

// //********FIRESTORE USERS COLLECTION******

// const createUser = (user) => {
//   database.collection("users")
//     .add(user)
//     .then((docRef) => console.log("Document written with ID: ", docRef.id))
//     .catch((error) => console.error("Error adding document: ", error));
// };

// /* const readAllUsers = (born) => {
//   db.collection("users")
//     .where("first", "==", born)
//     .get()
//     .then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//         console.log(doc.data());
//       });
//     });
// }; */

// // Read ONE
// function readOne(id) {
//   // Limpia el album para mostrar el resultado
//   cleanAlbum();

//   //Petición a Firestore para leer un documento de la colección album 
//   var docRef = database.collection("users").doc(id);

//   docRef.get().then((doc) => {
//     if (doc.exists) {
//       console.log("Document data:", doc.data());
//       printPhoto(doc.data().title, doc.data().url, doc.id);
//     } else {
//       // doc.data() will be undefined in this case
//       console.log("No such document!");
//     }
//   }).catch((error) => {
//     console.log("Error getting document:", error);
//   });

// }

/**************Firebase Auth*****************/

/*

const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha registrado ${user.email} ID:${user.uid}`)
      alert(`se ha registrado ${user.email} ID:${user.uid}`)
      // ...
      // Saves user in firestore
      createUser({
        id: user.uid,
        email: user.email,
        message: "hola!"
      });

    })
    .catch((error) => {
      console.log("Error en el sistema" + error.message, "Error: " + error.code);
    });
};


document.getElementById("form1").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;

  pass === pass2 ? signUpUser(email, pass) : alert("error password");
})


const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      alert(`se ha logado ${user.email} ID:${user.uid}`)
      console.log("USER", user);
    })
    .catch((error) => {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
}

const signOut = () => {
  let user = firebase.auth().currentUser;

  firebase.auth().signOut().then(() => {
    console.log("Sale del sistema: " + user.email)
  }).catch((error) => {
    console.log("hubo un error: " + error);
  });
}


document.getElementById("form2").addEventListener("submit", function (event) {
  event.preventDefault();
  let email = event.target.elements.email2.value;
  let pass = event.target.elements.pass3.value;
  signInUser(email, pass)
})
document.getElementById("salir").addEventListener("click", signOut);

// Listener de usuario en el sistema
// Controlar usuario logado
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    console.log(`Está en el sistema:${user.email} ${user.uid}`);
    document.getElementById("message").innerText = `Está en el sistema: ${user.uid}`;
  } else {
    console.log("no hay usuarios en el sistema");
    document.getElementById("message").innerText = `No hay usuarios en el sistema`;
  }
});

*/