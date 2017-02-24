var ngCrud = angular.module('ngCrud', ['ngFileUpload'])
ngCrud.factory('Crud', ['$http', 'Upload', function($http, Upload){

  var do_validation = false;
  function validationOn() {
    do_validation = true;
  }
  function validationOff() {
    do_validation = false;
  }

  function is_validation_on() {
    return do_validation;
  }

  function simpleCrud(url, item){

      /**
      * @desc fetch all items from server as per request
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.get_all=(callback)=>{
        $http.get(url.getAll).then((response)=>{ validate(callback, response.data, false)})
      }

      /**
      * @desc fetch only one item from server as per request
      * @param obj data - data is item id which details we need fetch
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.get_one = (data, callback)=>{
        $http({method:"GET",url:url, params:data}).then((response)=>{validate(callback, response.data, false)})
      }

      /**
      * @desc create an item in database as per requested url
      * @param obj data - it hold all input data of form
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.create = (data, callback)=>{
        $http.post(url.create, data).then((response)=>{validate(callback, response.data)})
      }

      /**
      * @desc update an item in database as per requested url
      * @param obj data - it hold all input data of form
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.update = (data, callback)=>{
        $http.post(url.update, data).then((response)=>{validate(callback, response.data)})
      }

      /**
      * @desc delete an item in database as per requested url
      * @param obj data - data is item id which you want to delete
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.destroy = (data, callback)=>{
        confirm("Delete this "+ item, ()=>{
          $http.post(url.destroy, data).then((response)=>{validate(callback, response.data)})
        });
      }
  }


  function uploadCrud(url, item){

      /**
      * @desc fetch all items from server as per request
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.get_all=(callback)=>{
        $http.get(url.getAll).then((response)=>{ validate(callback, response.data, false)})
      }

      /**
      * @desc fetch only one item from server as per request
      * @param obj data - data is item id which details we need fetch
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.get_one = (data, callback)=>{
        $http({method:"GET",url:url.getOne, params:data}).then((response)=>{validate(callback, response.data, false)})
      }

      /**
      * @desc create an item in database as per requested url
      * @param obj data - it hold all input data of form
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.create = (data, callback)=>{
        Upload.upload({
          url:url.create,
          data:data
        }).then(
          (response)=>{ validate(callback, response.data) })
        // $http.post(url.create, data).then((result)=>{validate(callback, result)})
      }

      /**
      * @desc update an item in database as per requested url
      * @param obj data - it hold all input data of form
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.update = (data, callback)=>{
        Upload.upload({
          url:url.update,
          data:data
        }).then(
          (response)=>{ validate(callback, response.data) })
        // $http.post(url.update, data).then((result)=>{validate(callback, result)})
      }

      /**
      * @desc delete an item in database as per requested url
      * @param obj data - data is item id which you want to delete
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.destroy = (data, callback)=>{
        confirm("Delete this "+ item, ()=>{
          $http.post(url.destroy, data).then((response)=>{validate(callback, response.data)})
        });
      }

      /**
      * @desc delete an item img in database as per requested url
      * @param obj data - data is item id and img name which you want to delete
      * @param function callback - it will be called with fetch data
      * @return nothing
      */
      this.destroy_img = (data, callback)=>{
        confirm("Delete this "+ item+ " IMAGE", ()=>{
          $http.post(url.destroyImg, data).then((response)=>{validate(callback, response.data)})
        });
      }

  }


  function validate(callback, result, flag = true) {
    if (is_validation_on()) {
      if (result.valid) {
        if (result.data.length == 0) {
          callback()
        } else {
          callback(result.data)
        }
        if(flag){
          success(result.msg)
        }
      }
      else {
        error(result.error)
        callback(false)
      }
    }
    else {
      callback(result)
    }

  }

  function success(msg) {
    swal("Success", msg, "success")
  }
  function error(msg) {
    swal("Error", msg, "error")
  }
  function confirm(alertMsg, callback) {
    swal({
        title: "Are you sure?",
        text: alertMsg,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel plx!",
        closeOnConfirm: true,
        closeOnCancel: true
    },callback);
  }

  return{
    simple:simpleCrud,
    file:uploadCrud
  }
}]);
