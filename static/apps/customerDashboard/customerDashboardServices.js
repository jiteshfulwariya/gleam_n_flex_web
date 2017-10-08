angular.module('services', [])
.factory('networkCall', function($http) {

	var getMyDetailsRequest = function() {
		return $http.get('/get/user/data/').then(function(result) {
			return result.data;
		});
	};

	var logoutRequest = function() {
		return $http.get('/logout/').then(function(result) {
			return result;
		});
	};

	var addBillRequest = function(userDetails) {
		return $http.post('/tracking/account/registration/', { userDetails: userDetails}).then(function(result) {
			return result;
		});
	};

	var getCustomerDetailsRequest = function(id) {
		return $http.post('/get/customer/', {customer_id: id}).then(function(result) {
			return result.data;
		});
	};

	var editCustomerDetailsByIdRequest = function(userDetails) {
		return $http.post('/tracking/account/registration/', { userDetails: userDetails}).then(function(result) {
			return result;
		});
	};

	var changePasswordRequest = function(password, confirm_password) {
		return $http.post('/change/password/', {new_password: password, confirm_new_password: confirm_password}).then(function(result) {
			return result;
		});
	};

	var changeUserPasswordRequest = function(new_password, confirm_password, userDetails) {
		return $http.post('/change/customer/password/', {new_password: new_password, confirm_new_password: confirm_password, inova_id: userDetails.inova_id, customer_id: userDetails.id}).then(function(result) {
			return result;
		});
	};

	var postRequestGetAllShipment = function(inova_id) {
		return $http.post('/get/all/shipments/', {inova_id: inova_id}).then(function(result) {
			return result;
		});
	};

	var getshipmentDetails = function(shipment_no, inova_id) {
		return $http.post('/get/shipment/details/', {inova_id: inova_id, shipment_no: shipment_no}).then(function(result) {
			return result;
		});
	};

	return {
		addBillRequest: addBillRequest,
		logoutRequest: logoutRequest,
		getMyDetailsRequest: getMyDetailsRequest,
		getCustomerDetailsRequest: getCustomerDetailsRequest,
		changePasswordRequest: changePasswordRequest,
		changeUserPasswordRequest: changeUserPasswordRequest,
		editCustomerDetailsByIdRequest: editCustomerDetailsByIdRequest,
		postRequestGetAllShipment:postRequestGetAllShipment,
		getshipmentDetails:getshipmentDetails
	};

});
