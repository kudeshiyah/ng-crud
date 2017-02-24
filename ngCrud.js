var ngCrud = angular.module('ngCrud', ['ngFileUpload'])
ngCrud.factory('Crud', ['$http', 'Upload', function($http, Upload){

  /**
  * @desc define simple crud operations
  * @param obj url - list of urls to perform crud operations
  * @param string item - name of entity we are peforming operation on
  * @return nothing
  */
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

  /**
  * @desc define file upload crud operations
  * @param obj url - list of urls to perform crud operations
  * @param string item - name of entity we are peforming operation on
  * @return nothing
  */
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


  /**
  * @desc validate results came from derver and take appropriate action
  * @param function callback - it will be called with fetch data
  * @param obj result - result of ajax request to server
  * @param bool flag - show success msg only if this flag is true
  * @return nothing
  */
  function validate(callback, result, flag = true) {
    if (result.valid) {
      if (result.data.length == 0) {
        callback()
      } else {
        callback(result.data)
      }
      if(flag){
        success(result.msg)
      }
    } else {
      error(result.error)
      callback(false)
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
