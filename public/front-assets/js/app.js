(()=>{"use strict";const t="#product-wrapper",e="#category-wrapper",a="#pagination-wrapper",r=".btn-paginate",n="#txt-product-count",o="#txt-total-product-count",c=".btn-category",i=".btn-add-to-cart",s="#basket-product-wrapper",l=".product-wrapper",u=".btn-quantity-increase",d=".btn-quantity-decrease",p=".btn-remove-from-cart";class g{createCategoryLink(t,e){return`<li><a href="#" class="btn-category" data-category-slug="${t}">${e}</a></li>`}createProductCard(t){let e=t.image.toString().startsWith("http")?t.image:`/storage/${t.image}`;return`\n            <div class="col-lg-4 col-md-6 col-sm-6">\n                <div class="product__item" data-product-id="${t.id}">\n                    <div class="product__item__pic set-bg">\n                        <img src="${e}" loading="lazy" alt="" style="width: 100%; height: 100%; object-fit: cover; border: 1px solid #000">\n                        <ul class="product__item__pic__hover">\n                            <li><a href="#" class="btn-add-to-cart"><i class="fa fa-shopping-cart"></i></a></li>\n                        </ul>\n                    </div>\n                    <div class="product__item__text">\n                        <h6><a href="#">${t.name}</a></h6>\n                        <h5>${t.price}</h5>\n                    </div>\n                </div>\n            </div>\n        `}createPagination(t){let e="";return null===t.url?e="pointer-events: none; cursor: default; background-color: #6c757d; color: #fff":t.active&&(e="background-color: #007bff; color: #fff"),`<a class="btn-paginate" href="${t.url}" style="${e}">${t.label}</a>`}createBasketProductListEmpty(){return'\n            <tr>\n                <td colspan="5">There is no product in the basket.</td>\n            </tr>\n        '}createBasketProductCard(t){let e=t.image.toString().startsWith("http")?t.image:`/storage/${t.image}`;return`\n            <tr class="product-wrapper" data-id="${t.id}">\n                <td class="shoping__cart__item">\n                    <img style="width: 150px; height: 150px; object-fit: cover; border: 1px solid #000" src="${e}" alt="">\n                    <h5>${t.name}</h5>\n                </td>\n                <td class="shoping__cart__price">\n                    ${t.price} ₺\n                </td>\n                <td class="shoping__cart__quantity">\n                    <div class="quantity">\n                        <div class="pro-qty d-flex justify-content-between align-items-center">\n                            <button class="btn btn-danger btn-quantity-decrease">-</button>\n                            <span class="txt-product-quantity">${t.quantity}</span>\n                            <button class="btn btn-success btn-quantity-increase">+</button>\n                        </div>\n                    </div>\n                </td>\n                <td class="shoping__cart__total">\n                    ${t.total_price} ₺\n                </td>\n                <td class="shoping__cart__item__close">\n                    <button class="btn btn-danger btn-remove-from-cart">\n                        <i class="fa fa-trash"></i>\n                    </button>\n                </td>\n            </tr>\n        `}createNotification(t,e,a){Swal.fire({title:t,text:e,icon:a})}}class _{get_categories(){let t=new g,a=this;axios.get(api_url.homepage.categories).then((function(r){let n=$(e),o=r.data.data.categories,i=t.createCategoryLink("/","Hepsini Göster");n.append(i),o.map((function(e){let a=t.createCategoryLink(e.slug,e.name);n.append(a)})),$(c).on("click",(t=>{t.preventDefault();let e=$(t.target).data("category-slug");a.get_products(e,1)}))})).catch((function(e){console.error(e),t.createNotification("Hata","Kategoriler yüklenirken bir hata oluştu","error")}))}get_products(e=null,c=1){let s=new g,l=this;axios.get(api_url.homepage.products,{params:{category:e,page:c}}).then((function(u){let d=$(t),p=$(n),g=$(o),_=u.data.data.products,h=_.data;g.text(_.total),p.text(`${_.from} - ${_.to}`),d.html(""),h.map((function(t){let e=s.createProductCard(t);d.append(e)})),$(a).html(""),_.links.map((function(t){let e=t.label;"Next &raquo;"===t.label?e=t.label.replace("Next ",""):"&laquo; Previous"===t.label&&(e=t.label.replace(" Previous",""));let n={url:t.url,label:e,active:t.active},o=s.createPagination(n);$(a).append(o),$(r).on("click",(t=>{t.preventDefault();let e=$(t.target).attr("href").split("page=")[1];l.get_products(selected_category,e)}))})),$(i).on("click",(t=>{t.preventDefault();let e=$(t.target).closest(".product__item").data("product-id");l.addToCart(e)})),selected_category=e,selected_page=c})).catch((function(t){console.error(t),s.createNotification("Hata","Ürünler yüklenirken bir hata oluştu","error")}))}addToCart(t){let e=new g;axios.post(api_url.basket.add.replace("###",t)).then((function(t){console.log(t),e.createNotification("Başarılı","Ürün sepete eklendi","success")})).catch((function(t){console.error(t),e.createNotification("Hata","Ürün sepete eklenirken bir hata oluştu","error")}))}get_basket_products(){let t=new g,e=this;axios.get(api_url.basket.get).then((function(a){let r=$(s),n=a.data.data;r.html(""),0===n.length&&r.append(t.createBasketProductListEmpty()),n.map((function(e){let a=t.createBasketProductCard(e);r.append(a)})),$(u).on("click",(t=>{t.preventDefault();let a=$(t.target).closest(l).data("id");e.increase_quantity(a)})),$(d).on("click",(t=>{t.preventDefault();let a=$(t.target).closest(l).data("id");e.decrease_quantity(a)})),$(p).on("click",(t=>{t.preventDefault();let a=$(t.target).closest(l).data("id");e.remove_from_cart(a)}))})).catch((function(e){console.error(e),t.createNotification("Hata","Sepet yüklenirken bir hata oluştu","error")}))}remove_from_cart(t){let e=new g,a=this;axios.post(api_url.basket.remove.replace("###",t)).then((function(t){console.log(t),a.get_basket_products()})).catch((function(t){console.error(t),e.createNotification("Hata","Ürün sepetten silinirken bir hata oluştu","error")}))}decrease_quantity(t){let e=new g,a=this;axios.post(api_url.basket.decrease.replace("###",t)).then((function(t){console.log(t),a.get_basket_products()})).catch((function(t){console.error(t),e.createNotification("Hata","Sepette ki ürün miktarı azaltılırken bir hata oluştu","error")}))}increase_quantity(t){let e=new g,a=this;axios.post(api_url.basket.increase.replace("###",t)).then((function(t){console.log(t),a.get_basket_products()})).catch((function(t){console.error(t),e.createNotification("Hata","Sepette ki ürün miktarı arttırılırken bir hata oluştu","error")}))}}window.Controller=class{constructor(){this.requester=new _}init_homepage(){this.requester.get_categories(),this.requester.get_products(),this.requester.get_basket_products()}init_basket(){this.requester.get_basket_products()}}})();