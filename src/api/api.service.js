import axios from 'axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

// const baseURL = 'https://dev-admin.globaltradeplaza.com/public/api/v1/';
// const baseURL = 'https://admin.globaltradeplaza.com/public/api/v1/';
// const baseURL = 'http://localhost:8000/api/v1/';

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const headers = async () => {
    const headersData = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    const token = cookies.get("auth_token");
    if (token) {
        headersData.Authorization = `Bearer ${token}`;
    }
    return headersData;
};

const request = async (method, path, body, token) => {
    const url = `${baseURL}${path}`;
    const options = {method, url, headers: await headers(token)};

    if (body) {
        options.data = body;
    }
    return axios(options);
};

export default class API {

    //HOME
    getHomeBuyerLeads() {
        return request('GET', 'common/buyer-leads-home', null, null);
    }

    activityLogs(data) {
        return request('POST', 'activity-logs', data, null);
    }

    autoCompProductSearch(data) {
        return request('GET', 'common/lead-products?query=' + data);
    }

    getHomeSellerLeads() {
        return request('GET', 'common/seller-leads', null, null);
    }

    getHomeCategories() {
        return request('GET', 'common/filter-categories', null, null);
    }

    getSingleCategory(category) {
        return request('GET', 'common/slug-categories/' + category, null, null);
    }

    getSingleSubCategory(category) {
        return request('GET', 'common/sub-slug-categories-list/' + category, null, null);
    }

    getSingleSubCategoryById(category) {
        return request('GET', 'common/sub-categories-list/' + category, null, null);
    }

    getSubChildCategories(category) {
        return request('GET', 'common/sub-categories/' + category, null, null);
    }

    getMembershipPlans() {
        return request('GET', 'common/membership-plans', null, null);
    }

    getSellerMembershipPlans() {
        return request('GET', 'seller/membership-plans', null, null);
    }

    getSellerMembership(token) {
        return request('GET', 'seller/membership', null, token);
    }

    getSingleMembershipPlan(membership_slug) {
        return request('GET', 'common/membership-plan-details/' + membership_slug, null, null);
    }

    getHomeMainBanners() {
        return request('GET', 'common/banners/1', null, null);
    }

    getHomeFeaturedProducts() {
        return request('GET', 'common/featured-products', null, null);
    }

    getHomeMagazines() {
        return request('GET', 'common/magazines', null, null);
    }

    getHomeTradeShow() {
        return request('GET', 'common/trade-shows', null, null);
    }

    getHomeBlogs() {
        return request('GET', 'common/blogs', null, null);
    }

    getHomeStories() {
        return request('GET', 'common/get-new-success-stories/1', null, null);
    }

    getHomeCategoryProducts() {
        return request('GET', 'common/category-products', null, null);
    }

    homeProductAutoCompleteSearch(data) {
        return request('POST', 'common/products-keyword-search', data);
    }

    homeSupplierAutoCompleteSearch(data) {
        return request('POST', 'common/supplier-keyword-search', data);
    }

    homeLeadAutoCompleteSearch(data) {
        return request('POST', 'common/lead-keyword-search', data);
    }

    getAllTradeShows(data) {
        return request('POST', 'common/trade-shows', data, null);
    }

    getAllNewsEvents(data) {
        return request('POST', 'common/blogs/news', data, null);
    }

    getSingleNewsEvents(slug) {
        return request('GET', 'common/slug-news/' + slug, null, null);
    }

    getAllBlogs(data) {
        return request('POST', 'common/blogs/blog', data, null);
    }

    getAllFAQs(data) {
        return request('GET', 'common/faqs', data, null)
    }

    getAllSuccessStories(data) {
        return request('GET', 'common/get-new-success-stories/0', data, null)
    }

    getAllJobs(data) {
        return request('GET', 'careers', data, null)
    }

    getAllRegions() {
        return request('GET', 'common/region-countries', null, null);
    }

    getSingleRegionDetail(slug) {
        return request('GET', 'common/country-slug-details/' + slug, null, null);
    }

    getBlogCategories() {
        return request('GET', 'common/blog_categories', null, null);
    }

    getBlogTopics() {
        return request('GET', 'common/blog_topics', null, null);
    }

    getSingleBlog(slug) {
        return request('GET', 'common/slug-blogs/' + slug, null, null);
    }

    getSingleTradeShow(slug) {
        return request('GET', 'common/trade-slug-show/' + slug, null, null);
    }

    getRelatedBlogs(blog_id, category_id) {
        return request('GET', 'common/cate-blogs/' + category_id + '/blog/' + blog_id, null, null);
    }

    getRelatedNews(news_id, category_id) {
        return request('GET', 'common/cate-blogs/' + category_id + '/news/' + news_id, null, null);
    }


    //Authorization

    signUp(data) {
        return request('POST', 'auth/register', data, null);
    }

    login(data) {
        return request('POST', 'auth/login', data, null);
    }

    authMe(token) {
        return request('get', 'auth/me', null, token);
    }

    authProfile(data) {
        return request('POST', 'auth/profile', data, null);
    }

    resetPassword(data) {
        return request('POST', 'auth/reset', data, null);
    }

    authCompanyProfile() {
        return request('GET', 'seller/company-profile', null, null);
    }

    authBusinessProfile() {
        return request('GET', 'seller/business-profile', null, null);
    }

    updateCompanyProfile(data) {
        return request('POST', 'seller/company-profile', data, null);
    }

    updateCompanyRegistration(id, data) {
        return request('POST', 'company/registration/' + id, data, null);
    }

    updateBusinessProfile(data) {
        return request('POST', 'seller/business-profile', data, null);
    }

    updateCompanyDocument(data) {
        return request('POST', 'company/documents', data, null);
    }

    updateCompanyCertificate(data) {
        return request('POST', 'company/certificates', data, null);
    }

    getCompanyCertificates() {
        return request('GET', 'company/certificates', null, null);
    }

    getSingleCertificate(certificate) {
        return request('GET', 'common/certificate/' + certificate, null, null);
    }

    getCompanyDocuments() {
        return request('GET', 'company/documents', null, null);
    }

    removeDocument(id) {
        return request('DELETE', 'company/document/' + id, null, null);
    }

    removeCertificate(id) {
        return request('DELETE', 'company/certificate/' + id, null, null);
    }


    addBusinessLocation(data) {
        return request('POST', 'seller/business-locations', data, null);
    }

    getBusinessLocation(type) {
        return request('GET', 'seller/business-locations/' + type, null, null);
    }

    removeBusinessLocation(id) {
        return request('DELETE', 'seller/business-location/' + id, null, null);
    }

    contactNow(data) {
        return request('POST', 'common/contact-us', data, null);
    }

    submitApplication(data) {
        return request('POST', 'career-inquiry', data, null)
    }

    postComment(data) {
        return request('POST', 'common/comment', data, null);
    }

    complaint(data) {
        return request('POST', 'common/feedback', data, null);
    }

    subscription(data) {
        return request('POST', 'common/subscribe', data, null);
    }

    submitFeedback(data) {
        return request('POST', 'common/feedback', data, null);
    }

    addProduct(data) {
        return request('POST', 'product', data, null);
    }

    deleteProduct(id) {
        return request('DELETE', 'product/' + id);
    }

    markAsFeatured(id) {
        return request('GET', 'feature/' + id);
    }

    updateProduct(data, product_id) {
        return request('POST', 'product/' + product_id, data, null);
    }

    singleProduct(product_id) {
        return request('GET', 'common/product-auth/' + product_id, null, null);
    }

    resend(data) {
        return request('POST', 'auth/resend', data, null);
    }

    forgot(data) {
        return request('POST', 'auth/forget', data, null);
    }

    otpVerification(data) {
        return request('POST', 'auth/verification', data, null);
    }

    uploadImage(data) {
        return request('POST', 'common/product-image-upload', data, null);
    }


    //user products
    userProducts(data) {
        return request('POST', 'seller/products', data);
    }

    featureProducts(){
        return request('GET', 'featured-products', null);
    }

    userRequirements() {
        return request('GET', 'seller/requirements', null);
    }

    deleteRequirement(id) {
        return request('POST', 'seller/remove-requirement/' + id, null);
    }

    //User leads
    getAllUserLeads(data) {
        return request('POST', 'common/buyer-leads', data);
    }

    getLatestLeads(data) {
        return request('POST', 'seller/category-leads', data);
    }

    getPurchaseLeads(data) {
        return request('POST', 'seller/purchase-leads-filter', data);
    }

    assignedLead(id) {
        return request('POST', 'seller/assigned-lead/' + id);
    }


    //Lead posting
    postRequirement(data, requestAPI) {
        return request('POST', requestAPI, data, null);
    }

    createRazorpayCustomOrder(data) {
        return request('POST', 'payment/generate-custom-order', data);
    }

    createRazorpayRenewOrder(data) {
        return request('POST', 'payment/generate-renew-order', data);
    }

    updateRazorpayRenewOrder(data) {
        return request('POST', 'payment/update-renew-order', data);
    }

    updateRazorpayOrder(data) {
        return request('POST', 'payment/update-order', data);
    }

    //Filters
    getAllProducts(data) {
        return request('POST', 'common/products', data, null);
    }

    getSingleProduct(slug) {
        return request('GET', 'common/slug-product/' + slug, null, null);
    }

    getSimilarProducts(seller_id, category_id) {
        return request('GET', 'common/similar/' + seller_id + "/" + category_id, null, null);
    }

    getRelatedProducts(category_id) {
        return request('GET', 'common/related/' + category_id, null, null);
    }

    //Leads
    getAllLeads(data) {
        return request('POST', 'common/buyer-leads', data, null);
    }

    getSingleLead(slug) {
        return request('GET', 'common/slug-requirement/' + slug, null, null);
    }

    getCategoryLeads(id) {
        return request('GET', 'common/cat-requirement/' + id, null, null);
    }

    //Supplier
    getAllSuppliers(data) {
        return request('POST', 'common/suppliers', data, null);
    }

    getSingleSupplier(slug) {
        return request('GET', 'common/slug-supplier/' + slug, null, null);
    }

    getSupplierProducts(seller_id) {
        return request('GET', 'common/seller-products/' + seller_id, null, null);
    }

    getSupplierFeatureProducts(seller_id) {
        return request('GET', 'common/feature-products/' + seller_id, null, null);
    }

    getSellerInquiry(data) {
        return request('POST', 'seller/inquiries', data, null);
    }

    getSelfInquiry() {
        return request('GET', 'seller/self-inquiries', null, null);
    }

    getSingleInquiry(id) {
        return request('GET', 'seller/inquiries/' + id, null, null);
    }


    //Chat
    createChatThread(data) {
        return request('POST', 'chat/thread', data, null);
    }

    sendMessage(data) {
        return request('POST', 'chat/message', data, null);
    }

    getThreadMessages(thread_id) {
        return request('GET', 'chat/message/' + thread_id, null, null);
    }

    getDashboardCounts() {
        return request('GET', 'dashboard-counts', null, null);
    }

    getDashboardInquiries() {
        return request('GET', 'seller/dashboard-inquiries', null, null);
    }

    getDashboardMessages() {
        return request('GET', 'seller/messages', null, null);
    }

    getCreditedPoints() {
        return request('GET', 'auth/credits-summary', null, null);
    }

    submitAuthFeedback(data) {
        return request('POST', 'auth/submit-feedback', data, null);
    }

    submitAuthComplaint(data) {
        return request('POST', 'auth/submit-complaint', data, null);
    }

    submitAuthTestimonial(data) {
        return request('POST', 'auth/submit-testimonial', data, null);
    }

}
