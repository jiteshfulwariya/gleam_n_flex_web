angular.module('services', [])
.factory('networkCall', function($http) {

	var getAllBillRequest = function() {
		return $http.get('/get/all/bill/').then(function(result) {
			return result.data;
		});
	};

	var getAllArchivedUsersRequest = function(page_no) {
		return $http.get('/get/archived/customers/', {page_no: page_no}).then(function(result) {
			return result.data;
		});
	};

	var logoutRequest = function() {
		return $http.get('/logout/').then(function(result) {
			return result;
		});
	};

	var addBillRequest = function(billDetails) {
		return $http.post('/add/bill/', { billDetails: billDetails}).then(function(result) {
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
			return result.data;
		});
	};

	var changeUserPasswordRequest = function(new_password, confirm_password, userDetails) {
		return $http.post('/change/customer/password/', {new_password: new_password, confirm_new_password: confirm_password, inova_id: userDetails.inova_id, customer_id: userDetails.id}).then(function(result) {
			return result;
		});
	};

	var restoredUserRequest = function(customer) {
		return $http.post('/restore/customer/', {customer_id: customer.id, inova_id: customer.inova_id}).then(function(result) {
			return result.data;
		});
	};

	var getBillDetailsRequest = function(id) {
		return $http.post('/get/bill/details/', {bill_id: id}).then(function(result) {
			return result.data;
		});
	};

	var addProductRequest = function(productDetails) {
		// console.log('Product to be save; ', productDetails);
		return $http.post('/add/product/', {productDetails: productDetails}).then(function(result) {
			return result.data;
		});
	};

	return {
		addBillRequest: addBillRequest,
		logoutRequest: logoutRequest,
		getAllBillRequest: getAllBillRequest,
		getCustomerDetailsRequest: getCustomerDetailsRequest,
		changePasswordRequest: changePasswordRequest,
		changeUserPasswordRequest: changeUserPasswordRequest,
		editCustomerDetailsByIdRequest: editCustomerDetailsByIdRequest,
		getAllArchivedUsersRequest: getAllArchivedUsersRequest,
		getBillDetailsRequest: getBillDetailsRequest,
		restoredUserRequest: restoredUserRequest,
		addProductRequest: addProductRequest
	};

});
