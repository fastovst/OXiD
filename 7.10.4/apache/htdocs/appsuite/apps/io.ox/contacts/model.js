define("io.ox/contacts/model",["io.ox/backbone/modelFactory","io.ox/backbone/validation","io.ox/core/extensions","io.ox/contacts/api","io.ox/settings/util","io.ox/core/strings","gettext!io.ox/contacts"],function(e,t,r,o,a,i,n){"use strict";function s(o,s){var m="io.ox/core/user/model"===o,l=new e({api:s,ref:o,updateEvents:["edit"],create:function(e){var t=e.toJSON(),r=t.pictureFileEdited||t.pictureFile;return t=_.omit(t,["crop","pictureFile","pictureFileEdited","image1"]),s.create(t,r)},update:function(e){var t=e.changedSinceLoading(),r=t.pictureFileEdited||t.pictureFile,o=m?a.yellOnReject:_.identity;return t=_.omit(t,["crop","pictureFile","pictureFileEdited"]),r?s.editNewImage({id:e.id,folder_id:e.get("folder_id")},_.omit(t,"image1"),r):o(s.update({id:e.id,folder:e.get("folder_id"),last_modified:e.get("last_modified"),data:t}))},destroy:function(e){return s.remove({id:e.id,folder_id:e.get("folder_id")})}});return t.validationFor(o,{display_name:{format:"string"},first_name:{format:"string"},last_name:{format:"string"},second_name:{format:"string"},suffix:{format:"string"},title:{format:"string"},street_home:{format:"string"},postal_code_home:{format:"string"},city_home:{format:"string"},state_home:{format:"string"},country_home:{format:"string"},birthday:{format:"date"},marital_status:{format:"string"},number_of_children:{format:"string"},profession:{format:"string"},nickname:{format:"string"},spouse_name:{format:"string"},anniversary:{format:"date"},note:{format:"text"},department:{format:"string"},position:{format:"string"},employee_type:{format:"string"},room_number:{format:"string"},street_business:{format:"string"},postal_code_business:{format:"string"},city_business:{format:"string"},state_business:{format:"string"},country_business:{format:"string"},number_of_employees:{format:"string"},sales_volume:{format:"string"},tax_id:{format:"string"},commercial_register:{format:"string"},branches:{format:"string"},business_category:{format:"string"},info:{format:"string"},manager_name:{format:"string"},assistant_name:{format:"string"},street_other:{format:"string"},city_other:{format:"string"},postal_code_other:{format:"string"},country_other:{format:"string"},telephone_business1:{format:"phone"},telephone_business2:{format:"phone"},fax_business:{format:"phone"},telephone_callback:{format:"phone"},telephone_car:{format:"phone"},telephone_company:{format:"phone"},telephone_home1:{format:"phone"},telephone_home2:{format:"phone"},fax_home:{format:"phone"},cellular_telephone1:{format:"phone"},cellular_telephone2:{format:"phone"},telephone_other:{format:"phone"},fax_other:{format:"phone"},email1:{format:"email"},email2:{format:"email"},email3:{format:"email"},url:{format:"url"},telephone_isdn:{format:"phone"},telephone_pager:{format:"phone"},telephone_primary:{format:"phone"},telephone_radio:{format:"phone"},telephone_telex:{format:"phone"},telephone_ttytdd:{format:"phone"},instant_messenger1:{format:"string"},instant_messenger2:{format:"string"},telephone_ip:{format:"phone"},telephone_assistant:{format:"phone"},company:{format:"string"},image1:{format:"string"},userfield01:{format:"string"},userfield02:{format:"string"},userfield03:{format:"string"},userfield04:{format:"string"},userfield05:{format:"string"},userfield06:{format:"string"},userfield07:{format:"string"},userfield08:{format:"string"},userfield09:{format:"string"},userfield10:{format:"string"},userfield11:{format:"string"},userfield12:{format:"string"},userfield13:{format:"string"},userfield14:{format:"string"},userfield15:{format:"string"},userfield16:{format:"string"},userfield17:{format:"string"},userfield18:{format:"string"},userfield19:{format:"string"},userfield20:{format:"string"},links:{format:"array"},distribution_list:{format:"array"},number_of_links:{format:"number"},number_of_images:{format:"number"},image_last_modified:{format:"number"},state_other:{format:"string"},file_as:{format:"string"},image1_content_type:{format:"string"},mark_as_distributionlist:{format:"boolean"},default_address:{format:"number"},image1_url:{format:"url"},internal_userid:{format:"number"},useCount:{format:"number"},yomiFirstName:{format:"string"},yomiLastName:{format:"string"},yomiCompany:{format:"string"},addressHome:{format:"string"},addressBusiness:{format:"string"},addressOther:{format:"string"},private_flag:{format:"boolean"}}),r.point(o+"/validation").extend({id:"upload_quota",validate:function(e){e.quotaExceeded&&this.add("attachments_list",n("Files can not be uploaded, because upload limit of %1$s is exceeded.",i.fileSize(e.quotaExceeded.attachmentMaxUploadSize,2)))}}),r.point(o+"/validation").extend({id:"birthday",validate:function(e){"birthday"in e&&null!==e.birthday&&!_.isNumber(e.birthday)&&this.add("birthday",n("Please set day and month properly"))}}),r.point(o+"/validation").extend({id:"first_name",validate:function(e){!e.user_id||e.first_name&&!_.isEmpty(String(e.first_name).trim())||this.add("first_name",n("First name must not be empty for internal users"))}}),r.point(o+"/validation").extend({id:"last_name",validate:function(e){!e.user_id||e.last_name&&!_.isEmpty(String(e.last_name).trim())||this.add("last_name",n("Last name must not be empty for internal users"))}}),l}var m={display_name:n("Display name"),first_name:n("First name"),last_name:n("Last name"),second_name:n("Middle name"),suffix:n("Suffix"),title:n.pgettext("salutation","Title"),street_home:n("Street"),postal_code_home:n("Postcode"),city_home:n("City"),state_home:n("State"),country_home:n("Country"),birthday:n("Birthday"),marital_status:n("Marital status"),number_of_children:n("Children"),profession:n("Profession"),nickname:n("Nickname"),spouse_name:n("Spouse's name"),anniversary:n("Anniversary"),note:n("Comment"),department:n("Department"),position:n("Position"),employee_type:n("Employee type"),room_number:n("Room number"),street_business:n("Street"),postal_code_business:n("Postcode"),city_business:n("City"),state_business:n("State"),country_business:n("Country"),number_of_employees:n("Employee ID"),sales_volume:n("Sales Volume"),tax_id:n("TAX ID"),commercial_register:n("Commercial Register"),branches:n("Branches"),business_category:n("Business category"),info:n("Info"),manager_name:n("Manager"),assistant_name:n("Assistant"),street_other:n("Street"),city_other:n("City"),postal_code_other:n("Postcode"),country_other:n("Country"),telephone_business1:n("Phone (business)"),telephone_business2:n("Phone (business alt)"),fax_business:n("Fax"),telephone_callback:n("Telephone callback"),telephone_car:n("Phone (car)"),telephone_company:n("Phone (company)"),telephone_home1:n("Phone (home)"),telephone_home2:n("Phone (home alt)"),fax_home:n("Fax (Home)"),cellular_telephone1:n("Cell phone"),cellular_telephone2:n("Cell phone (alt)"),telephone_other:n("Phone (other)"),fax_other:n("Fax (alt)"),email1:n("Email 1"),email2:n("Email 2"),email3:n("Email 3"),url:n("URL"),telephone_isdn:n("Telephone (ISDN)"),telephone_pager:n("Pager"),telephone_primary:n("Telephone primary"),telephone_radio:n("Telephone radio"),telephone_telex:n("Telex"),telephone_ttytdd:n("TTY/TDD"),instant_messenger1:n("Instant Messenger 1"),instant_messenger2:n("Instant Messenger 2"),telephone_ip:n("IP phone"),telephone_assistant:n("Phone (assistant)"),company:n("Company"),image1:n("Image 1"),userfield01:n("Optional 01"),userfield02:n("Optional 02"),userfield03:n("Optional 03"),userfield04:n("Optional 04"),userfield05:n("Optional 05"),userfield06:n("Optional 06"),userfield07:n("Optional 07"),userfield08:n("Optional 08"),userfield09:n("Optional 09"),userfield10:n("Optional 10"),userfield11:n("Optional 11"),userfield12:n("Optional 12"),userfield13:n("Optional 13"),userfield14:n("Optional 14"),userfield15:n("Optional 15"),userfield16:n("Optional 16"),userfield17:n("Optional 17"),userfield18:n("Optional 18"),userfield19:n("Optional 19"),userfield20:n("Optional 20"),links:n("Links"),distribution_list:n("Distribution list"),state_other:n("State"),mark_as_distributionlist:n("Mark as distributionlist"),default_address:n("Default address"),addressHome:n("Address Home"),addressBusiness:n("Address Business"),addressOther:n("Address Other"),private_flag:n("This contact is private and cannot be shared"),number_of_links:"Number of links",number_of_images:"Number of images",image_last_modified:"Image last modified",file_as:"File as",image1_content_type:"Image1 content type",image1_url:"Image1 url",internal_userid:"Internal userid",useCount:"use Count",yomiFirstName:"yomi First Name",yomiLastName:"yomi Last Name",yomiCompany:"yomi Company"},l=s("io.ox/contacts/model",o);return{Contact:l.model,Contacts:l.collection,factory:l,api:o,fields:m,protectedMethods:{buildFactory:s}}});