import * as THREE from "https://cdn.skypack.dev/three@0.133.1/build/three.module";
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const canvas = document.querySelector('.canvas');

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
canvas.appendChild( renderer.domElement );

camera.position.z = 5;

const renderButtonEl = document.querySelector('.render_button');
const figuresListEl = document.querySelector('.figures_id_list');
let figuresUuidList = [];
let selectedFigure = '';
renderButtonEl.addEventListener('click', renderFigure);

function renderFigure () {
    if(!renderButtonEl) return;
    switch (selectedFigure){
        case'Cube':
            renderCube();
            break;
        case 'Sphere':
            renderSphere();
            break;
        case 'Piramide':
            renderPiramide();
            break;
        default: break;
    }
    updateFiguresList();
}
function updateFiguresList () {
    figuresListEl.innerHTML = '';
    figuresUuidList.forEach((e, i) => {
        const listItem = document.createElement("LI");
        listItem.className = 'figures_id_list_item';
        const itemText = document.createTextNode(String(e));
        const deleteButton = document.createElement('BUTTON');
        const buttonText = document.createTextNode('x');
        deleteButton.appendChild(buttonText);
        deleteButton.className = 'delete_figure_button';
        deleteButton.addEventListener('click', deleteItem);
        deleteButton.setAttribute('data_uuid', e);
        listItem.appendChild(deleteButton);
        listItem.appendChild(itemText);
        figuresListEl.appendChild(listItem)
    })
}
function deleteItem(e) {
    const uuid = e.target.getAttribute('data_uuid');

    const object = scene.getObjectByProperty('uuid', uuid);
    console.log(uuid)
    console.log(object)
    scene.remove(object);
    figuresUuidList = figuresUuidList.filter(e => e !== uuid);
    e.target.removeEventListener('click', deleteItem);
    updateFiguresList();
    renderer.render( scene, camera );

}
function clearScene() {
    while(scene.children.length > 0){
        scene.remove(scene.children[0]);
    }
}

// const animate = () => {
//     requestAnimationFrame( animate );
//     cube.rotation.x += 0.01;
//     cube.rotation.y += 0.01;
//     renderer.render( scene, camera );
// }

const renderSphere = () => {
    const geometry = new THREE.SphereGeometry(1, 30, 30, 0, Math.PI, 0, Math.PI);
    const material = new THREE.MeshNormalMaterial();
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.x = Math.random() * 2 - 1;
    sphere.position.y = Math.random() + 0.15;
    sphere.position.z = Math.random() * 2 - 1;
    sphere.position.multiplyScalar( 5 );
    scene.add(sphere);
    figuresUuidList.push(sphere.uuid);
    renderer.render( scene, camera );
}

const renderPiramide = () => {
    const geometry = new THREE.ConeGeometry( 1, 2, 3 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    const cone = new THREE.Mesh( geometry, material );
    cone.position.x = Math.random() * 2 - 1;
    cone.position.y = Math.random() + 0.15;
    cone.position.z = Math.random() * 2 - 1;
    cone.position.multiplyScalar( 2 );
    scene.add( cone );
    figuresUuidList.push(cone.uuid);
    renderer.render( scene, camera );
}

const renderCube = () => {
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    cube.position.x = Math.random() * 2 - 1;
    cube.position.y = Math.random() + 0.15;
    cube.position.z = Math.random() * 2 - 1;
    cube.position.multiplyScalar( 5 );
    figuresUuidList.push(cube.uuid);
    scene.add( cube );
    renderer.render( scene, camera );
}

const selectFigure = (name) => {
    selectedFigure = name;
}

$(document).ready(function () {
    //Open Drop Down
    $(".custom-select").click(function (e) {
        e.preventDefault();

        if ($(".custom-select-wrapper").hasClass("open-dropdown")) {
            $(".custom-select-wrapper").removeClass("open-dropdown");
            $(this).parent().parent().toggleClass("open-dropdown");
        } else {
            $(this).parent().parent().toggleClass("open-dropdown");
        }
    });

    // On click get Current Selected tag Value

    $("ul li span").click(function (e) {
        if ($(".custom-select-wrapper").hasClass("open-dropdown")) {
            const current_value = $(this).text();
            selectFigure(current_value);
            $(".open-dropdown .custom-select").val(current_value);
            $(".custom-select-wrapper").removeClass("open-dropdown");
        }
    });

    // close when click on Body
    $("html").click(function (event) {
        if ($(event.target).closest(".custom-select").length === 0) {
            $(".custom-select-wrapper").removeClass("open-dropdown");
        }
    });
});
