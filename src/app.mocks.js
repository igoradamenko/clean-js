import getCompanies from 'mocks/getCompanies';

export default $httpBackend => {
  $httpBackend.whenGET(/\/api\/companies/).respond(getCompanies);

  $httpBackend.when('GET').passThrough();
  $httpBackend.when('PUT').passThrough();
  $httpBackend.when('POST').passThrough();
  $httpBackend.when('DELETE').passThrough();
  $httpBackend.when('PUT').passThrough();
};
