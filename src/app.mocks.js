import getCompanies from 'mocks/getCompanies';
import getCompany from 'mocks/getCompany';
import postOffice from 'mocks/postOffice';

export default $httpBackend => {
  $httpBackend.whenPOST(/\/api\/companies\/(\d+)\/office/, undefined, undefined, ['id']).respond(postOffice);
  $httpBackend.whenGET(/\/api\/companies\/(\d+)/, undefined, ['id']).respond(getCompany);
  $httpBackend.whenGET(/\/api\/companies/).respond(getCompanies);

  $httpBackend.when('GET').passThrough();
  $httpBackend.when('PUT').passThrough();
  $httpBackend.when('POST').passThrough();
  $httpBackend.when('DELETE').passThrough();
  $httpBackend.when('PUT').passThrough();
};
