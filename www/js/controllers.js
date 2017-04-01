 angular.module('starter.controllers', [])

.controller('LoginCtrl', function($scope, $state, Login, $cordovaGeolocation, $ionicPlatform) {
  $scope.email = '';
  $scope.senha = '';

  $ionicPlatform.ready(function(){
    $cordovaGeolocation.getCurrentPosition().then(function (position) {
          var latLng  = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

           var geocoder = new google.maps.Geocoder;

           geocoder.geocode({'location': latLng}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
              console.log(results);
            } else {
              window.alert('Geocoder failed due to: ' + status);
            }
          });
            
      }, function(err) {
          console.log(err);
      });
  })  

  $scope.fazerLogin = function(email, senha) {
Login.login(email, senha, function(erro) {
     
    if (erro) {
    
      }else {
        $state.go("inicio");
      }
    });
  }
  

  $scope.novoCadastro = function(email, senha) {
    Login.novo(email, senha, function(erro) {
     
    });
  }
 $scope.abrirCadastro = function(){
   $state.go("registro");
 }


})

.controller('InicioCtrl', function($scope, Tarefas) {
  $scope.produtos = [
    'Roupas',
    'Eletronicos',
    'Livros',
   
  ]
})
.controller('MarcasCtrl', function($scope, $stateParams, Produto) {
 $scope.produto = $stateParams.marca

$scope.marcas = []

 Produto.get(function(produtos){
  var produtosArray = converterObjParaArray(produtos)
  $scope.marcas = filtrarPorCategoria($scope.produto, produtosArray)
 })

 $scope.openLink = function (link) {
  window.open(link, '_target');
 }

})

.controller('TelacadastroCtrl', function($scope, Produto) {
  $scope.marca = '';
  $scope.categoria = '';
  $scope.imagem = '';
  $scope.url = '';
  $scope.cadastrar = function(marca, categoria, imagem, url){
    Produto.salvar(marca, categoria, imagem, url, function(error){
      if(error){
        alert(error)
      }
    })
  }
})

function converterObjParaArray (obj) {
  var array = [];
  for (var key in obj) {
    obj[key].id = key;
    array.push(obj[key]);
  }
  return array;
}

function filtrarPorCategoria (categoria, produtos) {
  var produtosFiltrados = [];
  for (var i = 0; i < produtos.length; i++) {
    if (produtos[i].categoria === categoria) {
      produtosFiltrados.push(produtos[i]);
    }
  }
  return produtosFiltrados;
} 

function ContentController($scope, $ionicSideMenuDelegate) {
  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
}