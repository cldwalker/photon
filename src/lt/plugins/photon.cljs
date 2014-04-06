(ns lt.plugins.photon
  (:require [lt.object :as object]
            [lt.objs.files :as files]
            [lt.objs.command :as cmd]
            [lt.objs.workspace :as workspace]
            [lt.plugins.photon.selector :as selector]
            [lt.objs.plugins :as plugins]
            [lt.objs.notifos :as notifos]
            [clojure.string :as s])
  (:require-macros [lt.macros :refer [behavior]]))

(def directories
  "Directories to search in for folders to add. Defaults to [:plugins].
  :plugins is an alias for a user's plugins directory"
  (atom [:plugins]))

(def home (files/home))

(defn expand-path [path]
  (s/replace-first path #"^~/" home))

(defn ->items [path]
  (let [children (files/ls-sync path {:dirs true})]
    (map #(hash-map :name (files/basename %) :path (files/join path %))
         children)))

(defn add-items []
  (->> @directories
       (map #(if (= :plugins %) plugins/user-plugins-dir (str %)))
       (map expand-path)
       (mapcat ->items)
       ;; consider case-insensitive
       (sort-by :name)))

(def add-selector
  (selector/selector {:items add-items
                      :key :name
                      :transform #(str "<p>" %3 "</p><p class='binding'>" (:path %4) "</p>")}))

(cmd/command {:command :photon.add-folder
              :desc "photon: Select folder to add"
              :options add-selector
              :exec (fn [item]
                      (object/raise workspace/current-ws :add.folder! (:path item))
                      (notifos/set-msg! (str "Added folder " (:path item))))})

(def remove-selector
  (selector/selector {:items (fn []
                               (map
                                #(hash-map :path % :name (files/basename %))
                                (:folders @workspace/current-ws)))
                      :key :name
                      :transform #(str "<p>" %3 "</p><p class='binding'>" (:path %4) "</p>")}))

(cmd/command {:command :photon.remove-folder
              :desc "photon: Select folder to remove"
              :options remove-selector
              :exec (fn [item]
                      (object/raise workspace/current-ws :remove.folder! (:path item))
                      (notifos/set-msg! (str "Removed folder " (:path item))))})

(behavior ::set-directories
          :triggers #{:object.instant}
          :type :user
          :exclusive true
          :desc "photon: Set directories to search in"
          :params [{:label "vec"
                    :example "[:plugins \"~/another/dir\"]"}]
          :reaction (fn [this dirs]
                      (reset! directories dirs)))

(comment
  (prn @directories)
  (->items (expand-path "~/code/fork"))
  (count (add-items))
  (reset! directories [:plugins "~/code/fork" "/Users/me/code/repo"]))
